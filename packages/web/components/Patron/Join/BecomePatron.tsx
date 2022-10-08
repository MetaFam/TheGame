import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  MetaButton,
  Text,
} from '@metafam/ds';
import PatronCircle from 'assets/patron/patron-circle.png';
import Seed from 'assets/patron/seed.png';

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
      direction={{ base: 'column', md: 'row' }}
      justifyContent="center"
      alignItems="center"
    >
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
          height="40em"
        >
          <Flex justify="center" align="center">
            <Image src={Seed} height="auto" maxW="16rem" my="6" />
          </Flex>
          <Text textAlign="center" fontSize="xl" as="p" marginBottom="8">
            Water Seeds yourself
          </Text>
          <Text mb={4}>
            Watering Seeds means adding Ether & Rai to the Seed pool aka
            plantation. You’ll need to have some Ether on Polygon, add it to the
            pool, join discord & talk to the collab land bot to let you in.
          </Text>
          <Text>Want a more detailed guide?</Text>

          <Flex mt="6" justifyContent="center">
            <Box mt={6} mb={4} px={2}>
              <MetaButton
                maxW=""
                as="a"
                bg="#E839B7"
                borderRadius={0}
                color="white"
                href="/play/paths/patrons-path"
                minW="10rem"
                mt={8}
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
                YES PLS!
              </MetaButton>
            </Box>
          </Flex>
        </Flex>
      </Flex>

      <Flex height="100%" justifyContent="center">
        <Text my="12" fontSize="lg" fontWeight="bold" as="h3">
          OR
        </Text>
      </Flex>

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
          height="40em"
        >
          <Flex justify="center" align="center">
            <Image src={PatronCircle} height="auto" maxW="16rem" my="6" />
          </Flex>
          <Text textAlign="center" fontSize="xl" as="p" marginBottom="8">
            Buy & forget about it
          </Text>
          <Text mb={4}>
            Too busy for buying the esoteric Rai, bridging over to Polygon &
            patiently watering Seeds over a long period of time so as to not
            overwater & slip?
          </Text>
          <Text>
            We got you covered! You can buy a chunk directly from MetaFam, just
            ask.
          </Text>
          <Flex mt="6" justifyContent="center">
            <Box mt={12} mb={4} px={2}>
              <MetaButton
                maxW=""
                as="a"
                bg="#E839B7"
                borderRadius={0}
                color="white"
                href="https://form.typeform.com/to/mAmXKSAc"
                minW="10rem"
                mt={8}
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
                PERFECT!
              </MetaButton>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  </Container>
);
