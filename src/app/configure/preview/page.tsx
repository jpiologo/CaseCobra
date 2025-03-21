import { db } from '@/db'
import { notFound } from 'next/navigation'
import DesignPreview from './DesignPreview'

// Removendo a interface PageProps e definindo o tipo diretamente na função
const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  // Resolvendo o searchParams com await
  const resolvedSearchParams = await searchParams
  const { id } = resolvedSearchParams

  if (!id || typeof id !== 'string') {
    return notFound()
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  })

  if (!configuration) {
    return notFound()
  }

  return <DesignPreview configuration={configuration} />
}

export default Page
