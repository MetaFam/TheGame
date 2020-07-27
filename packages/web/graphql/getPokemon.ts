import { Pokemon } from '../types/pokemon';
import { client } from './client';

const pokemonQuery = `
  query firstTwentyPokemons($name: String!) {
    pokemon(name: $name) {
      name
      image
    }
  }
`;

export const getPokemon = async (
  name: string | undefined,
): Promise<Pokemon | null> => {
  if (!name) return null;
  const {
    data: { pokemon },
  } = await client.query(pokemonQuery, { name }).toPromise();

  return pokemon;
};
