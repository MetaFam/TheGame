import { Box, Container, Flex, Heading, Image, MetaButton } from '@metafam/ds';
import SeedsEconomy from 'assets/patron/seed-economy.png';
import React from 'react';

export const WateringSeeds: React.FC = () => (
  <Container as="section" className="mg-patron-join-section" my={[4, 4, 4, 12]}>
    {/* Watering Seeds */}

    <Heading
      as="h2"
      color="white"
      fontFamily="mono"
      fontWeight={700}
      mb={[4, 4, 4, 12]}
    >
      Watering Seeds
    </Heading>

    <Flex direction="column" width="100%" align="center">
      <Image
        src={SeedsEconomy}
        height="auto"
        width="80vw"
        my="6"
        maxW="50rem"
      />
      <Box mb={4} px={2}>
        <MetaButton as="a" variant="link" href="/seeds" maxW="" p="4">
          MORE ABOUT SEEDS
        </MetaButton>
      </Box>
    </Flex>
  </Container>
);
