import { Box, Container, Heading, Image, Text, VStack } from '@metafam/ds';
import PatronMage from 'assets/patron/patron-mage.webp';
import React from 'react';

export const WhoArePatrons: React.FC = () => (
  <Container as="section" className="mg-patron-join-section">
    <Heading as="h2" fontFamily="mono" fontWeight={700} mb={[4, 4, 4, 12]}>
      Who are Patrons?
    </Heading>

    <Container className="mg-patron-join-card-bg" maxW="lg" centerContent>
      <VStack spacing={8} py={8} px={4}>
        <Image src={PatronMage.src} alt="cloaked figure" mx="auto" />

        <Box>
          <Text as="h3" fontWeight={700} mb={4}>
            Patrons are a vital part of the MetaGame
          </Text>
          <Text>
            As opposed to players, who are actively contributing their labor
            towards the creation of MetaGame & thus generating Seeds; patrons
            are here to water those Seeds until the Trees grow & MetaGame
            becomes self-sustainable.
          </Text>
        </Box>
      </VStack>
    </Container>
  </Container>
);
