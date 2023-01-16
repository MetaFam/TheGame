import {
  Box,
  Container,
  Flex,
  Heading,
  MetaButton,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  SimpleGrid,
  Text,
  VStack,
} from '@metafam/ds';
import { MarkdownViewer } from 'components/MarkdownViewer';
import { SquareImage } from 'components/SquareImage';
import { useRouter } from 'next/router';
import { guidanceDetails, Role } from 'utils/guidanceData';

import { upDownShortAnimation } from '../animations';

const OnboardingGuidance: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/start');
  };

  return (
    <Container
      w="100%"
      maxW={{ base: '25rem', md: '100%' }}
      mx="auto"
      px={0}
      pt={24}
      pb={12}
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
        mb={{ base: 12, lg: 24 }}
        columns={[1, null, 2, 3]}
        spacing={{ base: 20, lg: 8 }}
        autoRows="minmax(35rem, auto)"
      >
        <MetaTile height="full" width="full">
          <MetaTileHeader>
            <SquareImage
              src={guidanceDetails[Role.CuriousOcto].image}
              size="xl"
            />
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
                {guidanceDetails[Role.CuriousOcto].role}
              </Heading>
            </Flex>
          </MetaTileHeader>
          <MetaTileBody pos="relative" height="full">
            <Box pt={4}>
              {guidanceDetails[Role.CuriousOcto].details.map(
                (item: string, index: number) => (
                  <MarkdownViewer key={index}>{item}</MarkdownViewer>
                ),
              )}
            </Box>
            <Flex
              pos="absolute"
              bottom={{ base: -24, lg: -32 }}
              right={{ base: 16, md: 28, lg: 32 }}
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
        <MetaTile height="full" width="full">
          <MetaTileHeader>
            <SquareImage
              src={guidanceDetails[Role.EngagedOcto].image}
              size="xl"
            />
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
                {guidanceDetails[Role.EngagedOcto].role}
              </Heading>
            </Flex>
          </MetaTileHeader>
          <MetaTileBody pos="relative" height="full">
            <Box pt={4}>
              {guidanceDetails[Role.EngagedOcto].details.map(
                (item: string, index: number) => (
                  <MarkdownViewer key={index}>{item}</MarkdownViewer>
                ),
              )}
            </Box>
          </MetaTileBody>
        </MetaTile>
        <MetaTile height="full" width="full">
          <MetaTileHeader>
            <SquareImage
              src={guidanceDetails[Role.SpaceOcto].image}
              size="xl"
            />
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
                {guidanceDetails[Role.SpaceOcto].role}
              </Heading>
            </Flex>
          </MetaTileHeader>
          <MetaTileBody pos="relative" height="full">
            <Box pt={4}>
              {guidanceDetails[Role.SpaceOcto].details.map(
                (item: string, index: number) => (
                  <MarkdownViewer key={index}>{item}</MarkdownViewer>
                ),
              )}
            </Box>
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
