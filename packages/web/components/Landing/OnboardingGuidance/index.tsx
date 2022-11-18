import {
  Box,
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
import { PageContainer } from 'components/Container';
import { MarkdownViewer } from 'components/MarkdownViewer';
import { SquareImage } from 'components/SquareImage';
import { useRouter } from 'next/router';
import { guidanceDetails, Role } from 'utils/guidanceData';

const OnboardingGuidance: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/profile/setup/name');
  };

  return (
    <PageContainer w="100%" px={8}>
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
        p={12}
        mb={24}
        columns={[1, null, 2, 3]}
        spacing={{ base: 20, lg: 8 }}
        autoRows="minmax(35rem, auto)"
      >
        <MetaTile height="full" width="full" noTilt>
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
                style={{ backdropFilter: 'blur(10px)' }}
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
              bottom={-32}
              right={32}
              direction="column"
              alignItems="center"
              justifyContent="start"
            >
              <Text fontSize={{ base: '2xl', lg: '4xl' }}>☝️</Text>
              <Text fontSize="md">You are here</Text>
            </Flex>
          </MetaTileBody>
        </MetaTile>
        <MetaTile height="full" width="full" noTilt>
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
                style={{ backdropFilter: 'blur(10px)' }}
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
        <MetaTile height="full" width="full" noTilt>
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
                style={{ backdropFilter: 'blur(10px)' }}
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
    </PageContainer>
  );
};
export default OnboardingGuidance;
