import {
  ArrowUpIcon,
  Box,
  Button,
  Heading,
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
  /* 
   Get all the Patrons (MetaGame rules say there can be 150 max)
   Weird - with no limit, we get 33 patrons (using staging db I guess)
   With limit of 150 we get 42 patrons
   TODO(HHH-GH): remove most of this comment after testing it on staging
  */
  const patronsLimit = 150;
  const patrons = await getPatrons(patronsLimit);
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
  const topRef = useRef<HTMLDivElement>(null);

  function handleBackClick() {
    topRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <PageContainer>
      <HeadComponent
        title="MetaGame Patrons"
        description="MetaGame is a Massive Online Coordination Game! MetaGame’s Patrons enable us to succeed by helping us with funds."
        url="https://my.metagame.wtf/community/patrons"
      />

      {/* This is mostly here as a placeholder for the back to top link but screenreaders will read out the heading (Chakra's VisuallyHidden) */}
      <VisuallyHidden>
        <Heading
          fontSize="6xl"
          fontWeight={600}
          color="white"
          fontFamily="body"
          mb={[4, 4, 4, 12]}
          display="flex"
          flexDir="row"
          ref={topRef}
        >
          Patrons of MetaGame
        </Heading>
      </VisuallyHidden>

      {/* Make a consistent gap between the list, octo image, back to top link */}
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
