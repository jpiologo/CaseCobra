import { db } from '@/db'
import { notFound } from 'next/navigation'
import DesignConfigurator from './DesignConfigurator'

// Definindo a tipagem correta para searchParams como Promise
const Page = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) => {
  // Resolvendo o valor de searchParams com await
  const resolvedSearchParams = await searchParams
  const id = resolvedSearchParams.id

  if (!id || typeof id !== 'string') {
    return notFound()
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  })

  if (!configuration) {
    return notFound()
  }

  const { imageUrl, width, height } = configuration

  return (
    <DesignConfigurator
      configId={configuration.id}
      imageDimensions={{ width, height }}
      imageUrl={imageUrl}
    />
  )
}

export default Page
