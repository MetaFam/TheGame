import { Box, Container, Flex, Heading, Image, MetaButton } from '@metafam/ds';
import SeedsDiagram from 'assets/patron/seed-diagram.png';
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
      <Image alt="Diagram of the Seeds concept" src={SeedsDiagram.src} my="6" />
      <Box mb={4} px={2}>
        <MetaButton
          as="a"
          bg="#E839B7"
          borderRadius={0}
          color="white"
          href="/seeds"
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
          MORE ABOUT SEEDS
        </MetaButton>
      </Box>
    </Flex>
  </Container>
);
