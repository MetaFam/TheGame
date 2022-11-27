import {
  ArrowUpIcon,
  Box,
  Button,
  Image,
  VisuallyHidden,
  VStack,
} from '@metafam/ds';
import Octopus from 'assets/octopus.png';
import { PageContainer } from 'components/Container';
import { PatronList } from 'components/Patron/PatronList';
import { HeadComponent } from 'components/Seo';
import { getPatrons, getPSeedPrice } from 'graphql/getPatrons';
import { InferGetStaticPropsType } from 'next';
import React, { useRef } from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const patrons = await getPatrons();
  const pSeedPrice = await getPSeedPrice().catch((error) => {
    console.error('Error fetching pSeed price', error);
    return null;
  });
  return {
    props: {
      patrons,
      pSeedPrice,
    },
    revalidate: 1,
  };
};

const PatronsPage: React.FC<Props> = ({ patrons, pSeedPrice }) => {
  /**
   * For the back to top link
   */
  const topRef = useRef<HTMLHeadingElement>(null);
  function handleBackClick() {
    topRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <PageContainer>
      <HeadComponent
        title="MetaGame Patrons"
        description="MetaGame is a Massive Online Coordination Game! MetaGame’s Patrons enable us to succeed by helping us with funds."
        url="https://my.metagame.wtf/patrons"
      />

      {/* This is mostly here as a placeholder for the back to top link, but screenreaders will read out the heading
       * It is set as="h1" b/c the Chakra library VisuallyHidden component is a span by default
       */}
      <VisuallyHidden as="h1" ref={topRef}>
        Patrons of MetaGame
      </VisuallyHidden>

      {/* VStack is used to make a consistent gap between the Patrons list, and the Octo image and back to top link */}
      <VStack maxW="7xl" w="100%" spacing={{ base: 4, md: 8 }}>
        <PatronList {...{ patrons, pSeedPrice }} />

        {/* Back to top link */}
        <Image src={Octopus.src} pt={8} />

        <Box pb={4}>
          <Button
            leftIcon={<ArrowUpIcon />}
            variant="ghost"
            color="whiteAlpha.700"
            bgColor="whiteAlpha.50"
            _hover={{ bg: 'whiteAlpha.200' }}
            _active={{ bg: 'whiteAlpha.200' }}
            onClick={handleBackClick}
          >
            Back to top
          </Button>
        </Box>
      </VStack>
    </PageContainer>
  );
};
export default PatronsPage;
