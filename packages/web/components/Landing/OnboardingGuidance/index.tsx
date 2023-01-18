import {
  Container,
  Flex,
  Heading,
  Link,
  ListItem,
  MetaButton,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  SimpleGrid,
  Text,
  UnorderedList,
  VStack,
} from '@metafam/ds';
import BabyOctopus from 'assets/quests/baby_octo.png';
import Octopus from 'assets/quests/octopus.png';
import SpaceOctopi from 'assets/quests/space_octo.png';
import { SquareImage } from 'components/SquareImage';
import { useRouter } from 'next/router';

import { upDownShortAnimation } from '../animations';

const OnboardingGuidance: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/profile/setup/name');
  };

  return (
    <Container
      h="full"
      maxW={{
        base: '100%',
        md: 'xl',
        lg: '7xl',
        '2xl': 'full',
        '4xl': '90%',
      }}
      pt={{ base: 24, lg: 0 }}
      overflow={{ base: 'auto', lg: 'visible' }}
      centerContent
    >
      <VStack
        pos="relative"
        align="center"
        justify="center"
        spacing={0}
        maxW="full"
      >
        <Text fontWeight={600} fontSize={{ base: '2xl', lg: '3xl', xl: '4xl' }}>
          Joining MetaGame
        </Text>
        <Text
          fontWeight={400}
          fontSize="lg"
          textAlign={{ base: 'center', lg: 'start' }}
        >
          Your journey into MetaGame has just begun. Here's how it works:
        </Text>
      </VStack>
      <SimpleGrid
        py={{ base: 12, lg: 8 }}
        mb={{ base: 4, lg: 24 }}
        columns={[1, null, 2, 3]}
        spacing={{ base: 20, md: 8 }}
        autoRows="minmax(35rem, auto)"
      >
        <MetaTile>
          <MetaTileHeader>
            <SquareImage src={BabyOctopus.src} size="xl" />
            <Flex px={3} w="full" pos="absolute" bottom={-6} zIndex={1}>
              <Heading
                size="lg"
                color="white"
                bgColor="aplhaWhite.100"
                backdropFilter="blur(10px)"
                lineHeight={1.8}
                justifyContent="center"
                px={3}
                width="full"
                textAlign="center"
                borderRadius={10}
                fontFamily="body"
                fontWeight={400}
              >
                Curious Octo
              </Heading>
            </Flex>
          </MetaTileHeader>
          <MetaTileBody>
            <UnorderedList pt={4} pl={4} fontWeight={300}>
              <ListItem>You start your journey as a Curious Octo.</ListItem>
              <ListItem>
                It means your curiosity has led you to look down the MetaGame
                rabbit hole & wonder what's in&nbsp;there.
              </ListItem>
            </UnorderedList>
            <Flex
              pos="absolute"
              bottom={{ base: -24, lg: -32 }}
              right={{ base: 20, md: 28, lg: 32 }}
              direction="column"
              alignItems="center"
              justifyContent="start"
            >
              <Text
                fontSize={{ base: '2xl', lg: '4xl' }}
                sx={{
                  animation: upDownShortAnimation,
                  animationPlayState: 'playing',
                  animationDuration: '.6s',
                }}
              >
                ☝️
              </Text>
              <Text fontSize="md">You are here</Text>
            </Flex>
          </MetaTileBody>
        </MetaTile>
        <MetaTile>
          <MetaTileHeader>
            <SquareImage src={Octopus.src} size="xl" />
            <Flex px={3} w="full" pos="absolute" bottom={-6} zIndex={1}>
              <Heading
                size="lg"
                color="white"
                bgColor="aplhaWhite.100"
                backdropFilter="blur(10px)"
                lineHeight={1.8}
                justifyContent="center"
                px={3}
                width="full"
                textAlign="center"
                borderRadius={10}
                fontFamily="body"
                fontWeight={400}
              >
                Engaged Octo
              </Heading>
            </Flex>
          </MetaTileHeader>
          <MetaTileBody>
            <UnorderedList pt={4} pl={4} fontWeight={300}>
              <ListItem>
                To become an Engaged Octo you need to complete at least one
                quest & check into&nbsp;Discord.
              </ListItem>
              <ListItem>
                A transitory stage with{' '}
                <Text as="strong">temporary access</Text> to the community while
                you test MetaGame & it tests you.
              </ListItem>
            </UnorderedList>
          </MetaTileBody>
        </MetaTile>
        <MetaTile>
          <MetaTileHeader>
            <SquareImage src={SpaceOctopi.src} size="xl" />
            <Flex px={3} w="full" pos="absolute" bottom={-6} zIndex={1}>
              <Heading
                size="lg"
                color="white"
                bgColor="aplhaWhite.100"
                backdropFilter="blur(10px)"
                lineHeight={1.8}
                justifyContent="center"
                px={3}
                width="full"
                textAlign="center"
                borderRadius={10}
                fontFamily="body"
                fontWeight={400}
              >
                Space Octo
              </Heading>
            </Flex>
          </MetaTileHeader>
          <MetaTileBody>
            <UnorderedList pt={4} pl={4} fontWeight={300}>
              <ListItem>
                Space Octopi aka Players & Patrons are fully grown Octopi with
                full membership in&nbsp;MetaGame.
              </ListItem>
              <ListItem>
                Members of MetaFam and{' '}
                <Link
                  textDecoration="underline"
                  href="https://wiki.metagame.wtf/wtf-is-metagame/the-300-of-metagame"
                  isExternal
                >
                  The 300 of&nbsp;MetaGame
                </Link>
                .
              </ListItem>
              <ListItem>
                On their way to become the founders of&nbsp;MetaGame.
              </ListItem>
            </UnorderedList>
          </MetaTileBody>
        </MetaTile>
      </SimpleGrid>
      <MetaButton
        onClick={handleClick}
        colorScheme="purple"
        textTransform="uppercase"
        letterSpacing="0.1em"
        p={4}
        size="lg"
        fontSize="md"
        color="white"
        _hover={{ background: 'purple.600' }}
      >
        I Understand
      </MetaButton>
    </Container>
  );
};
export default OnboardingGuidance;
