import {
  ArrowUpIcon,
  Box,
  Button,
  Container,
  Heading,
  Image,
  LoadingState,
  MetaButton,
  VStack,
} from '@metafam/ds';
import Octopus from 'assets/octopus.png'; // in the footer
import { PageContainer } from 'components/Container';
import { GuildList } from 'components/Guild/GuildList';
import { DecentralizedFactory } from 'components/Guild/Join/DecentralizedFactory';
import { DecideJoin } from 'components/Guild/Join/DecideJoin';
import { Requirements } from 'components/Guild/Join/Requirements';
import { TiersPerks } from 'components/Guild/Join/TiersPerks';
import { WhatAreGuilds } from 'components/Guild/Join/WhatAreGuilds';
import { WhyJoin } from 'components/Guild/Join/WhyJoin';
import { HeadComponent } from 'components/Seo';
import { getGuilds } from 'graphql/queries/guild';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

/* 
  Get a list of guilds to show in the Other guilds include... section
*/
export const getStaticProps = async () => {
  const guildsLimit = 6; // How many guilds to show on the page?
  const guilds = await getGuilds(guildsLimit);
  return {
    props: {
      guilds,
    },
    revalidate: 1,
  };
};

export const GuildJoinLanding: React.FC<Props> = ({ guilds }) => {
  /* 
    For the back to top link at the bottom of the page
  */
  const router = useRouter();
  const topRef = useRef<HTMLDivElement>(null);

  function handleBackClick() {
    topRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  if (router.isFallback) {
    return <LoadingState />;
  }

  /* 
    Some styles that are reused 
    .mg-guild-join-section        The page sections
    .mg-guild-join-card-bg        The background color etc for cards
                                  in the sections
  */
  const css = {
    '.mg-guild-join-section': {
      w: '100%',
      maxW: '6xl',
    },
    '.mg-guild-join-card-bg': {
      backgroundColor: 'whiteAlpha.200',
      backdropFilter: 'blur(7px)',
      boxShadow: 'md',
      borderRadius: 'lg',
    },
  };

  return (
    <PageContainer sx={css}>
      <VStack maxW="6xl" w="100%" spacing={{ base: 8, md: 20 }}>
        <HeadComponent
          title="Join MetaGame as a Guild"
          description="We are looking for projects that are either building pieces of the infrastructure for the society of the future, offering tools &amp; services to those that are, or just doing something cool."
          url="https://metagame.wtf/join/guild"
        />

        <Container w="full" maxW="6xl">
          {/* Needs to be a <Heading> instead of <MetaHeading> or ref won't work for the scroll to top */}
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
            Join as a Guild!
          </Heading>
        </Container>

        {/* Section: What are Guilds */}
        <WhatAreGuilds />

        {/* Section: A Decentralized Factory */}
        <DecentralizedFactory />

        {/* Section: Why have your guild join MetaGame? */}
        <WhyJoin />

        {/* Section: Requirements */}
        <Requirements />

        {/* Section: Tiers and Perks */}
        <TiersPerks />

        {/* Section: Other guilds include... 
          NOTES
          - Was supposed to be limited to 6 guilds with a LOAD MORE button :(
          - Is actually limited to first 6 guilds with VIEW ALL GUILDS button that links to https://metagame.wtf/guilds
          - This section is not imported as a component because getStaticProps is used to get the list of guilds and it's not possible
            to use getStaticProps in a component that is imported to a static page
        */}

        <Container as="section" className="mg-guild-join-section">
          <Heading
            as="h2"
            color="white"
            fontFamily="mono"
            fontWeight={700}
            mb={[4, 4, 4, 12]}
          >
            Other guilds include &hellip;
          </Heading>
          <Container
            w="100%"
            maxW={{ base: '25rem', md: '100%' }}
            mx="auto"
            px={0} // Don't double up the padding that comes with Container
            centerContent
          >
            <GuildList {...{ guilds }} />

            <MetaButton
              as="a"
              bg="#E839B7"
              borderRadius={0}
              color="white"
              href="https://metagame.wtf/guilds"
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
              View all guilds
            </MetaButton>
          </Container>
        </Container>

        {/* Section: Decided to join? */}
        <DecideJoin />

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

export default GuildJoinLanding;
