import {
  ArrowUpIcon,
  Box,
  Button,
  Container,
  Heading,
  Image,
  MetaButton,
  VStack,
} from '@metafam/ds';
// images
import Octopus from 'assets/octopus.png';
// components
import { PageContainer } from 'components/Container';
import { BecomePatron } from 'components/Patron/Join/BecomePatron';
import { RankedLeagues } from 'components/Patron/Join/RankedLeagues';
import { WateringSeeds } from 'components/Patron/Join/WateringSeeds';
import { WhatsTheProduct } from 'components/Patron/Join/WhatsTheProduct';
import { WhoArePatrons } from 'components/Patron/Join/WhoArePatrons';
import { PatronList } from 'components/Patron/PatronList';
import { HeadComponent } from 'components/Seo';
import { getPatrons } from 'graphql/getPatrons';
import { InferGetStaticPropsType } from 'next';
import React, { useRef } from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const patrons = await getPatrons();
  return {
    props: {
      patrons: patrons || [],
    },
    revalidate: 1,
  };
};

const PatronsJoinLanding: React.FC<Props> = ({ patrons }) => {
  const topRef = useRef<HTMLDivElement>(null);

  function handleBackClick() {
    topRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const css = {
    '.mg-patron-join-section': {
      w: '100%',
      maxW: '6xl',
    },
    '.mg-patron-join-card-bg': {
      backgroundColor: 'whiteAlpha.200',
      backdropFilter: 'blur(7px)',
      boxShadow: 'md',
      borderRadius: 'lg',
    },
  };

  return (
    <PageContainer sx={css}>
      <HeadComponent
        title="Join as a Patron!"
        description="MetaGame is a Massive Online Coordination Game! Join as a Patron to help us grow it."
        url="https://my.metagame.wtf/join/patron"
      />
      <Container w="100%" maxW="6xl">
        <Heading
          as="h1"
          color="white"
          fontFamily="mono"
          fontSize="6xl"
          fontWeight={700}
          mb={[4, 4, 4, 12]}
          textAlign="center"
          ref={topRef}
        >
          Join as a Patron!
        </Heading>
      </Container>

      {/* Section: Who are Patrons? */}

      <WhoArePatrons />

      {/* Section: Watering Seeds */}

      <WateringSeeds />

      {/* Section: What is the product */}

      <WhatsTheProduct />

      {/* Section: Ranked Leagues & Perks */}

      {<RankedLeagues />}

      {/* Section: Other patrons include... */}

      <Container as="section" className="mg-patron-join-section">
        <Heading
          as="h2"
          color="white"
          fontFamily="mono"
          fontWeight={700}
          my={[4, 4, 4, 12]}
        >
          Other patrons include...
        </Heading>

        <Container
          w="100%"
          maxW={{ base: '25rem', md: '100%' }}
          mx="auto"
          px={0}
          centerContent
        >
          <PatronList patrons={patrons.slice(0, 6)} />
          <Box mt={12} mb={4} px={2}>
            <MetaButton
              maxW=""
              as="a"
              bg="#E839B7"
              borderRadius={0}
              color="white"
              href="/community/patrons"
              minW="10rem"
              mt={{ base: 8, md: 12 }}
              px={6}
              textTransform="uppercase"
              _hover={{
                backgroundColor: 'rgba(232, 57, 183, 0.6)',
              }}
              _active={{
                backgroundColor: 'rgba(232, 57, 183, 0.6)',
                transform: 'scale(0.8)',
              }}
            >
              LOAD MORE
            </MetaButton>
          </Box>
        </Container>
      </Container>

      {/* Section: How to become a patron? */}

      <BecomePatron />

      {/* Back to Top button */}

      <VStack>
        <Image src={Octopus} pt={8} />
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

export default PatronsJoinLanding;
