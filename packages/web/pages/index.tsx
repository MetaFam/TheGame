import { Box, Heading, Image, SimpleGrid } from '@metafam/ds';
import { InferGetStaticPropsType } from 'next';

import { MetaLink } from '../components/Link';
import { getPokemons } from '../graphql/getPokemons';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const pokemon = await getPokemons();
  return {
    props: {
      pokemon,
    },
  };
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

export default Home;
