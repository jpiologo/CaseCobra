interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page = async ({ searchParams }: PageProps) => {
    const { id } = searchParams
  //make db call
  return <p>{id}</p>
}

export default Page
