import { Box, Heading, Image, SimpleGrid } from '@metafam/ds';
import { GetStaticProps } from 'next';

import { MetaLink } from '../components/Link';
import { getPokemons } from '../graphql/getPokemons';
import { Pokemon } from '../types/pokemon';

type Props = {
  pokemon: Array<Pokemon>;
};

const Home: React.FC<Props> = ({ pokemon }) => (
  <SimpleGrid columns={{ sm: 2, lg: 3 }} spacing={6}>
    {pokemon.map((p) => (
      <MetaLink as={`/pokemon/${p.name}`} href="pokemon/[name]">
        <Box key={p.name}>
          <Heading style={{ textTransform: 'capitalize' }}>{p.name}</Heading>
          <Image src={p.image} alt={p.name} />
        </Box>
      </MetaLink>
    ))}
  </SimpleGrid>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pokemon = await getPokemons();
  return {
    props: {
      pokemon,
    },
  };
};

export default Home;
