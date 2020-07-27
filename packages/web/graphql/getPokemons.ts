import { Pokemon } from '../types/pokemon';
import { client } from './client';

const firstTwentyPokemonsQuery = `
  query firstTwentyPokemons {
    pokemons(first: 20) {
      image
      name
    }
  }
`;

export const getPokemons = async (): Promise<Array<Pokemon>> => {
  const {
    data: { pokemons },
  } = await client.query(firstTwentyPokemonsQuery).toPromise();

  return pokemons.map((pokemon: Pokemon) => ({
    ...pokemon,
    name: pokemon.name.toLowerCase(),
  }));
};
