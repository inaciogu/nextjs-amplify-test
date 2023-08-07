import { GetServerSideProps } from "next"
import Link from "next/link"

interface Data {
  data: any
}

export default function Pokes({ data }: Data) {
  return (
    <>
      <h1>POKES</h1>
      <ul>
        {data.results.map((poke: any) => (
          <li key={poke.name}>
            <Link href={`/pokes/${poke.name}`}>
              {poke.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon')
  const data = await res.json()

  return {
    props: {
      data,
    },
  }
}