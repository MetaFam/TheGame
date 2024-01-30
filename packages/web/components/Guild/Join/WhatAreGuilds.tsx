import { Box, Container, Heading, Image, Text, VStack } from '@metafam/ds';
import GuildsSunlessImg from 'assets/guilds-sunless_384x449.webp';


export const WhatAreGuilds: React.FC = () => (
  <Container
    as="section"
    className="mg-guild-join-section" // CSS class defined in packages/web/pages/Guild/Join/index.tsx
  >
    <Heading
      as="h2"
      color="white"
      fontFamily="mono"
      fontWeight={700}
      mb={[4, 4, 4, 12]}
    >
      What are Guilds?
    </Heading>

    <Container
      className="mg-guild-join-card-bg" // CSS class defined in packages/web/pages/Guild/Join/index.tsx
      maxW="lg"
      centerContent
    >
      <VStack spacing={8} py={8} px={4}>
        <Image src={GuildsSunlessImg.src} alt="Cloaked figure" mx="auto" />

        <Box>
          <Text as="h3" fontWeight={700} mb={4}>
            Guilds make up the Decentralized Factory
          </Text>
          <Text mb={4}>
            Guilds are simply groups of players &amp; patrons doing something
            useful in our or one of the adjacent ecosystems.
          </Text>
          <Text>
            Guilds of MetaGame aka the MetaAlliance are a network of service
            &amp; project DAOs, making up The Decentralized Factory.
          </Text>
        </Box>
      </VStack>
    </Container>
  </Container>
);
