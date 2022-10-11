import {
  Box,
  Container,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@metafam/ds';

export const WhatsTheProduct: React.FC = () => (
  <Container as="section" className="mg-patron-join-section" my={[4, 4, 4, 12]}>
    <Heading
      as="h2"
      color="white"
      fontFamily="mono"
      fontWeight={700}
      mb={[4, 4, 4, 12]}
    >
      So what’s the product, what’s the revenue model???
    </Heading>
    <Flex justify="center" mb={24}>
      <Text p="4" maxW="45rem" className="mg-patron-join-card-bg">
        There are a few, actually, along with various monetization &
        sustainability strategies. If you want to dig deeper, it might be best
        to dig down the raids section & ask some questions or read the
        Purplepaper 🙃
      </Text>
    </Flex>

    <Heading
      as="h2"
      color="white"
      fontFamily="mono"
      fontWeight={700}
      mb={[4, 4, 4, 12]}
    >
      Why you should become a Patron of MetaGame?
    </Heading>

    <Flex justify="center">
      <Box p="4" maxW="45rem" className="mg-patron-join-card-bg">
        <Text>
          We prefer our patrons inrinsically motivated, so the main reason you'd
          want to become a patron is just the fact you love this whole idea of
          MetaGame & want to see it succeed.
        </Text>
        <UnorderedList>
          <ListItem>
            If you weren’t so damn busy, you’d probably join in on building it,
            but at this point, its easier for you to just pitch in a bucket of
            water & support the movement passively.
          </ListItem>
        </UnorderedList>
      </Box>
    </Flex>
  </Container>
);
