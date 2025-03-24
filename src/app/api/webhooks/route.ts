import { db } from '@/db'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { Resend } from 'resend'
import OrderReceivedEmail from '@/components/emails/OrderReceivedEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = (await headers()).get('stripe-signature')

    if (!signature) {
      return new Response('Invalid signature', { status: 400 })
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      // biome-ignore lint/style/noNonNullAssertion:
      process.env.STRIPE_WEBHOOK_SECRET!,
    )

    if (event.type === 'checkout.session.completed') {
      if (!event.data.object.customer_details?.email) {
        throw new Error('Missing user email')
      }

      const session = event.data.object as Stripe.Checkout.Session

      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      }

      if (!userId || !orderId) {
        throw new Error('Invalid request metadata')
      }

      // biome-ignore lint/style/noNonNullAssertion:
      const billingAddress = session.customer_details!.address
      // biome-ignore lint/style/noNonNullAssertion:
      const shippingAddress = session.shipping_details!.address

      const updatedOrder = await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              // biome-ignore lint/style/noNonNullAssertion:
              name: session.customer_details!.name!,
              // biome-ignore lint/style/noNonNullAssertion:
              city: shippingAddress!.city!,
              // biome-ignore lint/style/noNonNullAssertion:
              country: shippingAddress!.country!,
              // biome-ignore lint/style/noNonNullAssertion:
              postalCode: shippingAddress!.postal_code!,
              // biome-ignore lint/style/noNonNullAssertion:
              street: shippingAddress!.line1!,
              // biome-ignore lint/style/noNonNullAssertion:
              state: shippingAddress!.state,
            },
          },
          billingAddress: {
            create: {
              // biome-ignore lint/style/noNonNullAssertion:
              name: session.customer_details!.name!,
              // biome-ignore lint/style/noNonNullAssertion:
              city: billingAddress!.city!,
              // biome-ignore lint/style/noNonNullAssertion:
              country: billingAddress!.country!,
              // biome-ignore lint/style/noNonNullAssertion:
              postalCode: billingAddress!.postal_code!,
              // biome-ignore lint/style/noNonNullAssertion:
              street: billingAddress!.line1!,
              // biome-ignore lint/style/noNonNullAssertion:
              state: billingAddress!.state,
            },
          },
        },
      })

      await resend.emails.send({
        from: 'CaseCobra <no-reply@casecobra.brazil.com>',
        to: [event.data.object.customer_details.email],
        subject: 'Thanks for your order!',
        react: OrderReceivedEmail({
          orderId,
          orderDate: updatedOrder.createdAt.toLocaleDateString(),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          shippingAddress: {
            // biome-ignore lint/style/noNonNullAssertion:
            name: session.customer_details!.name!,
            // biome-ignore lint/style/noNonNullAssertion:
            city: shippingAddress!.city!,
            // biome-ignore lint/style/noNonNullAssertion:
            country: shippingAddress!.country!,
            // biome-ignore lint/style/noNonNullAssertion:
            postalCode: shippingAddress!.postal_code!,
            // biome-ignore lint/style/noNonNullAssertion:
            street: shippingAddress!.line1!,
            // biome-ignore lint/style/noNonNullAssertion:
            state: shippingAddress!.state,
          },
        }),
      })
    }

    return NextResponse.json({ result: event, ok: true })
  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { message: 'Something went wrong', ok: false },
      { status: 500 },
    )
  }
}
