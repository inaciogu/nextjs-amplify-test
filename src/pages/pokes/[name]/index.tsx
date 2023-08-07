import { GetStaticPaths, GetStaticProps } from "next"

interface Data {
  data: any
}

export default function Poke({ data }: Data) {
  return (
    <>
      <h1>{data.name}</h1>
      <img src={data.sprites.front_default} alt={data.name} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon')
  const data = await res.json()

  const paths = data.results.map((poke: any) => ({
    params: { name: poke.name },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params?.name}`)
  const data = await res.json()

  return {
    props: {
      data,
    },
  }
}