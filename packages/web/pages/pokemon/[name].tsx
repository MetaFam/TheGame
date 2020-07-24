import { GetStaticPaths, GetStaticProps } from 'next';
import Error from 'next/error';

import { getPokemon } from '../../graphql/getPokemon';
import { getPokemons } from '../../graphql/getPokemons';
import { Pokemon } from '../../types/pokemon';

type Props = {
  pokemon: Pokemon | null
}

const PokemonPage: React.FC<Props> = ({ pokemon }) => {
  if (!pokemon) {
    return <Error statusCode={404}/>;
  }

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.image} alt={pokemon.name}/>
    </div>

  );
};
export default PokemonPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemons = await getPokemons();

  return {
    paths: pokemons.map(({ name }) => ({
      params: { name },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, { name: string }> = async (context) => {
  const name = context.params?.name;
  const pokemon = await getPokemon(name);

  return {
    props: {
      pokemon,
    },
  };
};
