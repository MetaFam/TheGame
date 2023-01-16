import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  MetaButton,
  Text,
  VStack,
} from '@metafam/ds';
import PatronCircle from 'assets/patron/patron-circle.png';
import Seed from 'assets/patron/seed.png';
import React from 'react';

export const BecomePatron: React.FC = () => (
  <Container as="section" className="mg-patron-join-section" my={[4, 4, 4, 12]}>
    <Heading
      as="h2"
      color="white"
      fontFamily="mono"
      fontWeight={700}
      mb={[8, 8, 8, 12]}
    >
      How to become a patron?
    </Heading>

    <Flex
      direction={{ base: 'column', lg: 'row' }}
      alignItems={{ base: 'center', lg: 'stretch' }}
      justifyContent="center"
    >
      <Box
        className="mg-patron-join-card-bg" // CSS class defined in packages/web/pages/Guild/Join/index.tsx
        maxW={{ base: 'md', lg: '24rem' }}
        p={6}
      >
        <VStack spacing={4}>
          <Image
            src={Seed.src}
            alt="Seed icon"
            mx="auto"
            maxH={{ md: '20rem', lg: '12rem' }}
            width="auto"
          />
          <Text color="white" fontFamily="mono" fontSize="lg">
            Water Seeds yourself
          </Text>
          <Text color="white">
            Watering Seeds means adding Ether &amp; RAI to the Seed pool aka
            plantation. You’ll need to have some Ether on Polygon, add it to the
            pool, join Discord &amp; talk to the CollabLand bot to let you in.
          </Text>
          <Text>Want a more detailed guide?</Text>
          <Box mt="auto">
            <MetaButton
              as="a"
              bg="#E839B7"
              borderRadius={0}
              color="white"
              href="/play/paths/patrons-path"
              minW="10rem"
              my={2}
              px={6}
              _hover={{
                backgroundColor: 'rgba(232, 57, 183, 0.6)',
              }}
              _active={{
                backgroundColor: 'rgba(232, 57, 183, 0.6)',
                transform: 'scale(0.8)',
              }}
            >
              YES PLS!
            </MetaButton>
          </Box>
        </VStack>
      </Box>

      <Box textAlign="center" p={9} alignSelf="center">
        <Text color="white" fontFamily="mono" fontSize="lg">
          OR
        </Text>
      </Box>

      <Box
        className="mg-patron-join-card-bg"
        maxW={{ base: 'md', lg: '24rem' }}
        p={6}
      >
        <VStack spacing={4}>
          <Image
            src={PatronCircle.src}
            alt="Cloaked figure with staff"
            mx="auto"
            maxH={{ md: '20rem', lg: '12rem' }}
            width="auto"
          />
          <Text color="white" fontFamily="mono" fontSize="lg">
            Buy &amp; forget about it
          </Text>
          <Text color="white">
            Too busy for buying the esoteric Rai, bridging over to Polygon &amp;
            patiently watering Seeds over a long period of time so as to not
            overwater &amp; slip?
          </Text>
          <Text>
            We got you covered! You can buy a chunk directly from MetaFam, just
            ask.
          </Text>
          <Box>
            <MetaButton
              as="a"
              bg="#E839B7"
              borderRadius={0}
              color="white"
              href="https://form.typeform.com/to/mAmXKSAc"
              minW="10rem"
              my={2}
              px={6}
              _hover={{
                backgroundColor: 'rgba(232, 57, 183, 0.6)',
              }}
              _active={{
                backgroundColor: 'rgba(232, 57, 183, 0.6)',
                transform: 'scale(0.8)',
              }}
            >
              PERFECT!
            </MetaButton>
          </Box>
        </VStack>
      </Box>
    </Flex>
  </Container>
);
