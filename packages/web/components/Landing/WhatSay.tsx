import { Box, Container, Flex, HStack, Text } from '@metafam/ds';
import { FullPageContainer } from 'components/Container';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { Player } from 'graphql/autogen/types';
import { getPlayer } from 'graphql/getPlayer';
import { useMotionDetector } from 'lib/hooks/useMotionDetector';
import { useOnScreen } from 'lib/hooks/useOnScreen';
import React, { useEffect, useRef, useState } from 'react';

import { LandingNextButton } from './LandingNextButton';
import { LandingPageSectionProps } from './landingSection';

export const WhatSay: React.FC<LandingPageSectionProps> = ({
  section,
  nextSection,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const root = typeof window !== 'undefined' ? document.body : null;
  const noMotion = useMotionDetector(root);
  const displayElement = noMotion ? true : !!onScreen;

  return (
    <FullPageContainer
      id={section.internalLinkId}
      position="relative"
      overflow="clip"
    >
      <Container
        display="flex"
        maxW={{ base: '100%', md: 'xl', lg: '7xl', '2xl': '8xl', '4xl': '70%' }}
        height="100%"
        alignItems={{ base: 'flex-start', xl: 'center' }}
        justifyContent="center"
        pos="relative"
      >
        <Box
          flex="1"
          background="linear-gradient(180deg, rgba(23, 11, 41, 0.00) 0%, #170B28 100%)"
          pos="absolute"
          h="70%"
          bottom={-9}
          w="100vw"
          zIndex={100}
          pointerEvents="none"
        />
        <Flex
          zIndex={99}
          gap={20}
          {...{ ref }}
          display="flex"
          flexDirection="column"
          justifyContent={{ base: 'flex-start', xl: 'center' }}
          maxWidth={{
            base: '90%',
            md: '3xl',
            xl: '5xl',
            '2xl': '8xl',
            '4xl': '100%',
          }}
          maxH={{ base: '60%', md: '90%', lg: 'initial' }}
          overflowY={{ base: 'auto', xl: 'visible' }}
          pl={{ base: 0, md: 0 }}
          transform={`translate3d(0, ${displayElement ? '0' : '50px'}, 0)`}
          opacity={displayElement ? 1 : 0}
          transition={
            'transform 0.3s 0.1s ease-in-out, opacity 0.5s 0.2s ease-in'
          }
          sx={{
            h2: {
              color: 'landing500',
              fontSize: { base: 'xl', md: '3xl', xl: '3xl', '2xl': '4xl' },
              textAlign: 'center',
              textShadow: '0 0 5px var(--chakra-colors-landing500)',
              transform: {
                base: 'none',
                xl: 'translate3d(0, 15px, 0)',
                '4xl': 'translate3d(0, -60px, 0)',
              },
            },
          }}
        >
          <Text as="h2" fontWeight="700">
            What people are saying
          </Text>

          <Flex gap={8}>
            <Flex flex="1" direction="column" gap={8}>
              <WhatSayCard
                player="METADREAMER"
                testimony="MetaGame was my gateway drug to web3. It felt like I was reading my own internal thoughts on how the world could be, and to this day it’s my guiding philosophy for the future of society. Being able to collaborate with people who felt the same to help build it was the best way to start contributing in web3 and became a launchpad / network to a bunch of the best projects and people in the space"
                username="metadreamer"
              />

              <WhatSayCard
                player="Kyle Stargarden"
                testimony="MetaGame was the launching pad for my career in Web3. When I joined Metagame I was working as a personal assistant. Now I am Lead Blockchain Engineer and public speaker at some of the world's top Web3 conferences."
                username="kyle-stargarden"
              />
            </Flex>
            <Flex flex="1" direction="column" gap={8}>
              <WhatSayCard
                player="Yalor"
                testimony="MetaGame inspired me join the Web3 ecosystem after a season of disillusionment and ICO scams 😛
      Through MetaGame I found the most amazing community of values aligned ecosystem innovators that I still work with today 🤩"
                username="yalormewn"
              />
              <WhatSayCard
                player="Geleeroyale"
                testimony="I love Metagame as it still stands alone between the Ethereum communities . I have never met a more passionate bunch - the vibes are legendary, the fun is permeating and the compassion revolutionary. Metagame is a prime example of how networks can improve peoples life permanently."
                username="geleeroyale"
              />
            </Flex>
            <Flex flex="1" direction="column" gap={8}>
              <WhatSayCard
                player="Griff Green"
                testimony="MetaGame embodies the actual fucking point of crypto, it's vision is the world I want to live in."
              />
              <WhatSayCard
                player="Alp"
                testimony="Looking back at the early days,  I remember minting one of the first DAO member attestation NFTs of MetaGame. The community embraced the DAO vision early on and pioneering the space ever since."
              />
              <WhatSayCard
                player="Saimano"
                testimony="Metagame, my gateway to a new world. It not only helped me forge a career in web3 but also introduced me to an amazing community with a sense of belonging that fueled my growth & propelled me forward."
                username="saimano"
              />
            </Flex>
          </Flex>
        </Flex>
      </Container>
      <LandingNextButton section={nextSection?.internalLinkId} />
    </FullPageContainer>
  );
};

const WhatSayCard: React.FC<{
  player: string;
  testimony: string;
  username?: string;
}> = ({ player, testimony, username }) => {
  const [pfp, setPfp] = useState<Player | undefined>(undefined);

  useEffect(() => {
    const getPfp = async () => {
      const getPlayerResponse = await getPlayer(username);

      if (getPlayerResponse?.profile?.profileImageURL) {
        setPfp(getPlayerResponse);
      }
    };
    getPfp();
  }, [username]);

  return (
    <Box
      fontSize="md"
      fontWeight={400}
      py={8}
      px={10}
      border-radius="8px"
      border="1px solid #5B1D66"
      background="#1D0E32"
      boxShadow="0px 8px 28px 4px rgba(137, 59, 153, 0.25)"
    >
      <HStack mb={3}>
        <PlayerAvatar size="sm" player={pfp || ({} as Player)} />
        <Text>{player}</Text>
      </HStack>
      <Text lineHeight="1.5rem">{testimony}</Text>
    </Box>
  );
};
