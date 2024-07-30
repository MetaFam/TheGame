import {
  Box,
  Container,
  Flex,
  Heading,
  MarkdownViewer,
  MetaButton,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  SimpleGrid,
  Text,
  VStack,
} from '@metafam/ds';
import { useRouter } from 'next/router';

import { SquareImage } from '#components/SquareImage';
import { guidanceDetails, Role } from '#utils/guidanceData';

import { upDownShortAnimation } from '../animations';

const OnboardingGuidance: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/start');
  };

  return (
    <Container
      px={0}
      h="max-content"
      pt={{ base: 1500, lg: 300 }}
      maxW={['100%', 'xl', '7xl', 'full', '90%']}
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
        mb={{ base: 8, lg: 24 }}
        columns={[1, null, 2, 3]}
        spacing={{ base: 24, lg: 8 }}
        autoRows="minmax(35rem, auto)"
      >
        {Object.entries(guidanceDetails).map(([role, { details, image }]) => (
          <Card
            key={role}
            {...{
              role,
              details,
              image,
              showStatus: role === Role.CuriousOcto,
            }}
          />
        ))}
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

type CardProps = {
  role: string;
  details: string[];
  image: string;
  showStatus: boolean;
};

const Card: React.FC<CardProps> = ({ role, details, image, showStatus }) => (
  <MetaTile height="full" width="full">
    <MetaTileHeader>
      <SquareImage src={image} />
      <Flex px={3} w="full" pos="absolute" bottom={-6} zIndex={1}>
        <Heading
          size="lg"
          color="white"
          bgColor="rgba(255, 255, 255, 0.06)"
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
          {role}
        </Heading>
      </Flex>
    </MetaTileHeader>
    <MetaTileBody pos="relative" height="full">
      {details.map((item: string, index: number) => (
        <Box key={index} sx={{ ul: { fontWeight: 300 } }}>
          <MarkdownViewer>{item}</MarkdownViewer>
        </Box>
      ))}
      {showStatus && (
        <Flex
          pos="absolute"
          bottom={{ base: -24, lg: -32 }}
          right={{ base: 28, lg: 32 }}
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
      )}
    </MetaTileBody>
  </MetaTile>
);
export default OnboardingGuidance;
