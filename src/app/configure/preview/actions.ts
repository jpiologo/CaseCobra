/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { BASE_PRICE, PRODUCT_PRICES } from '@/config/products'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const createCheckoutSession = async ({
  configId,
}: { configId: string }) => {
  const configuration = await db.configuration.findUnique({
    where: { id: configId },
  })

  if (!configuration) {
    throw new Error('No such configuration found')
  }

  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    throw new Error('You need to be logged to complete the purchase')
  }

  const { finish, material } = configuration

  let price = BASE_PRICE
  if (finish === 'textured') {
    price += PRODUCT_PRICES.finish.textured
  }
  if (material === 'polycarbonate') {
    price += PRODUCT_PRICES.material.polycarbonate
  }

  
}
