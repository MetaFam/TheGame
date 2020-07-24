import { GetStaticProps } from 'next';
import Link from 'next/link'

import { getPokemons } from '../graphql/getPokemons'
import { Pokemon } from '../types/pokemon';

type Props = {
  pokemon: Array<Pokemon>
}

const Home: React.FC<Props> = ({ pokemon }) => (
  <ul>
    {pokemon.map((p) => (
      <li key={p.name}>
        <Link as={`/pokemon/${p.name}`} href="pokemon/[name]">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            <h2 style={{ textTransform: 'capitalize' }}>{p.name}</h2>
            <img src={p.image} alt={p.name}/>
          </a>
        </Link>
      </li>
    ))}
  </ul>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pokemon = await getPokemons()
  return {
    props: {
      pokemon,
    },
  }
}

export default Home;
