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
import BabyOctopus from 'assets/quests/baby_octo.png';
import Octopus from 'assets/quests/octopus.png';
import SpaceOctopi from 'assets/quests/space_octo.png';
import { PageContainer } from 'components/Container';
import { MarkdownViewer } from 'components/MarkdownViewer';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import roleJson from './guidance.json';
import { RolePicture } from './RolePicture';

type GuidanceRole = {
  role: string;
  details: string[];
  image: string;
};

enum Role {
  CuriousOcto = 'Curious Octo',
  EngagedOcto = 'Engaged Octo',
  SpaceOcto = 'Space Octo',
}

const OnboardingGuidance: React.FC = () => {
  const router = useRouter();
  const guidanceRoles = useRef<GuidanceRole[]>([]);
  useEffect(() => {
    guidanceRoles.current = roleJson.roles.map(({ role, list }) => {
      const guidance: GuidanceRole = { role, details: list, image: '' };
      if (role === Role.CuriousOcto) guidance.image = BabyOctopus.src;
      if (role === Role.EngagedOcto) guidance.image = Octopus.src;
      if (role === Role.SpaceOcto) guidance.image = SpaceOctopi.src;
      return guidance;
    });
  }, []);

  const handleClick = () => {
    router.push('/profile/setup/name');
  };

  return (
    <PageContainer w="100%" mt={24} px={8}>
      <VStack
        pos="relative"
        align="center"
        justify="center"
        mb={{ base: '3rem' }}
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
      {!!guidanceRoles.current?.length && (
        <SimpleGrid
          columns={[1, null, 2, 3]}
          spacing={{ base: 20, lg: 8 }}
          autoRows="minmax(35rem, auto)"
        >
          {guidanceRoles.current?.map(({ role, details, image }) => (
            <Box key={role}>
              <MetaTile height="full" width="full" noTilt>
                <MetaTileHeader>
                  <RolePicture src={image} size="xl" />
                  <Flex px={3} w="full" pos="absolute" bottom={-6} zIndex={1}>
                    {role && (
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
                    )}
                  </Flex>
                </MetaTileHeader>
                <MetaTileBody pos="relative" height="full">
                  {!!details?.length && (
                    <Box pt={4}>
                      {details.map((item, index) => (
                        <MarkdownViewer key={index}>{item}</MarkdownViewer>
                      ))}
                    </Box>
                  )}
                </MetaTileBody>
              </MetaTile>
              {role === Role.CuriousOcto && (
                <Flex
                  mt={{ base: 2, lg: 4 }}
                  direction="column"
                  alignItems="center"
                  justifyContent="start"
                >
                  <Text fontSize={{ base: '2xl', lg: '4xl' }}>☝️</Text>
                  <Text fontSize="md">You are here</Text>
                </Flex>
              )}
            </Box>
          ))}
        </SimpleGrid>
      )}
      <Box pt={{ base: 16, lg: 32 }} pb={16}>
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
      </Box>
    </PageContainer>
  );
};
export default OnboardingGuidance;
