import {
  Box,
  Flex,
  Heading,
  ListItem,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  SimpleGrid,
  Text,
  UnorderedList,
  useBreakpointValue,
  VStack,
} from '@metafam/ds';
import Octopus from 'assets/quests/octopus.png';
import { SquareImage } from 'components/SquareImage';

import roleJson from './guidance.json';

const OnboardingGuidance: React.FC = () => {
  const CardImage = useBreakpointValue({
    base: Octopus,
  });

  return (
    <Box
      w="100%"
      position="relative"
      display="flex"
      flexDirection="column"
      height="100vh"
      width="100%"
      alignContent="center"
      alignItems="center"
      py={32}
      px={8}
    >
      <VStack
        pos="relative"
        align="center"
        justify="center"
        mb={{ base: '3rem' }}
        spacing={0}
        maxW="full"
      >
        <Text fontWeight={600} fontSize={{ base: '3xl', lg: '4xl', xl: '5xl' }}>
          Joining MetaGame
        </Text>
        <Text fontWeight={400} fontSize={{ base: 'lg' }}>
          Your journey into MetaGame has just begun. Here's how it works:
        </Text>
      </VStack>
      <SimpleGrid
        columns={[1, null, 2, 3]}
        spacing={8}
        autoRows="minmax(35rem, auto)"
      >
        {roleJson.roles.map(({ role, list }) => (
          <MetaTile height="full" width="full" cursor="pointer">
            <MetaTileHeader>
              <SquareImage src={CardImage?.src} size="xl" />
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
              <UnorderedList pt={4}>
                {list.map((item) => (
                  <ListItem fontSize={{ base: 'sm', md: 'md' }}>
                    {item}
                  </ListItem>
                ))}
              </UnorderedList>
            </MetaTileBody>
          </MetaTile>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default OnboardingGuidance;
