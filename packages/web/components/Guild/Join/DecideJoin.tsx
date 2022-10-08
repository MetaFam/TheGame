import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  MetaButton,
  Text,
} from '@metafam/ds';
import GuildsImg from 'assets/guilds-sun_800x800.png';

export const DecideJoin: React.FC = () => {
  const guildApplicationLink = 'https://form.typeform.com/to/V5YNcdMQ';

  return (
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
        Decided to join?
      </Heading>

      {/*
        The two flex items are stacked until the md breakpoint, then go to columns
      */}
      <Container
        className="mg-guild-join-card-bg" // CSS class defined in packages/web/pages/Guild/Join/index.tsx
        maxW="2xl"
        p={8}
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={GuildsImg}
            alt="Three cloaked figures"
            mx="auto"
            maxW="10rem"
            mb={{ base: 8, md: 0 }}
          />

          <Box ml={{ base: 0, md: 8 }} flex="auto">
            <Text as="p" mb={6} textAlign="center">
              Ready to join the Decentralized Factory &amp; become one of the
              Founding Guilds of MetaGame? Apply now 👇
            </Text>

            <Center>
              <MetaButton
                as="a"
                bg="#E839B7"
                borderRadius={0}
                color="white"
                href={guildApplicationLink}
                mb={4}
                minW="10rem"
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
                Apply
              </MetaButton>
            </Center>
          </Box>
        </Flex>
      </Container>
    </Container>
  );
};
