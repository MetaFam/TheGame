import { Box, Flex, Image, MetaButton, Text } from '@metafam/ds';
import PatronCircle from 'assets/patron/patron-circle.png';
import Seed from 'assets/patron/seed.png';

export const BecomePatron: React.FC = () => (
  <Flex flexDirection="column" justifyContent="center">
    <Text my="12" fontSize="lg" fontWeight="bold" as="h3">
      How to become a patron?
    </Text>

    <Flex flexDirection="row" justifyContent="center" alignItems="center">
      <Flex direction="column" width="100%" align="center">
        <Flex
          direction="column"
          bg="whiteAlpha.200"
          style={{ backdropFilter: 'blur(7px)' }}
          rounded="lg"
          p={6}
          maxW="25rem" // (2 / 3.5) = ~0.571 aspect ratio desired
          w="100%"
          h="100%"
          align="stretch"
          position="relative"
          overflow="hidden"
          justify="space-between"
          my={12}
        >
          <Flex justify="center" align="center">
            <Image src={Seed} height="auto" maxW="16rem" my="6" mb="12" />
          </Flex>
          <Text fontSize="md" as="p" fontWeight="bold" marginBottom="2">
            Water Seeds yourself
          </Text>
          <Text>
            Watering Seeds means adding Ether & Rai to the Seed pool aka
            plantation. You’ll need to have some Ether on Polygon, add it to the
            pool, join discord & talk to the collab land bot to let you in.
          </Text>
          <Text>Want a more detailed guide?</Text>
          <Flex mt="6" justifyContent="center">
            <Box mb={4} px={2}>
              <MetaButton as="a" variant="link" href="/seeds" maxW="" p="4">
                YES PLS!
              </MetaButton>
            </Box>
          </Flex>
        </Flex>
      </Flex>

      <Text my="12" fontSize="lg" fontWeight="bold" as="h3">
        OR
      </Text>

      <Flex direction="column" width="100%" align="center">
        <Flex
          direction="column"
          bg="whiteAlpha.200"
          style={{ backdropFilter: 'blur(7px)' }}
          rounded="lg"
          p={6}
          maxW="25rem" // (2 / 3.5) = ~0.571 aspect ratio desired
          w="100%"
          h="100%"
          align="stretch"
          position="relative"
          overflow="hidden"
          justify="space-between"
          my={12}
        >
          <Flex justify="center" align="center">
            <Image src={PatronCircle} height="auto" maxW="16rem" my="6" />
          </Flex>
          <Text fontSize="md" as="p" fontWeight="bold" marginBottom="2">
            Buy & forget about it
          </Text>
          <Text>
            Too busy for buying the esoteric Rai, bridging over to Polygon &
            patiently watering Seeds over a long period of time so as to not
            overwater & slip?
          </Text>
          <Text>
            We got you covered! You can buy a chunk directly from MetaFam, just
            ask.
          </Text>
          <Flex mt="6" justifyContent="center">
            <Box mb={4} px={2}>
              <MetaButton as="a" variant="link" href="/seeds" maxW="" p="4">
                PERFECT!
              </MetaButton>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  </Flex>
);
