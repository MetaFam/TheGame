import {
  ArrowUpIcon,
  AspectRatio,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  LoadingState,
  MetaTag,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Progress,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import Octopus from 'assets/octopus.png';
import Inkeeping from 'assets/raids/Inkeeping.png';
import MetaMedia from 'assets/raids/MetaMedia.png';
import MetaOS from 'assets/raids/MetaOS.png';
import { PageContainer } from 'components/Container';
import { HeadComponent } from 'components/Seo';
import { SquareImage } from 'components/SquareImage';
import { PlayerSkillFragment, SkillCategory_Enum } from 'graphql/autogen/types';
import { getSkills } from 'graphql/queries/enums/getSkills';
import { SkillColors } from 'graphql/types';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { convertToRoman } from 'utils/formatHelpers';

const RaidsPage: React.FC = () => {
  const router = useRouter();
  const topRef = useRef<HTMLDivElement>(null);

  function handleBackClick() {
    topRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const [choices, setChoices] = useState<Array<PlayerSkillFragment>>();
  useEffect(() => {
    const fetchSkills = async () => {
      const skillChoices = await getSkills();
      setChoices(skillChoices);
    };

    fetchSkills();
  }, []);

  if (router.isFallback) {
    return <LoadingState />;
  }

  const phases = [
    {
      title: 'Seed',
      subtitle: 'A Decentralized Factory',
      description:
        'Build onboarding flows, a resource base and a network of project & service DAOs for anyone interested in decentralized applications & organizations.',
    },
    {
      title: 'Growth',
      subtitle: 'A Web of Opportunity',
      description:
        'Expand resources & knowledge, build a network of networks where anyone can level up, find meaningful projects to contribute to & start earning.',
    },
    {
      title: 'Equilibrium',
      subtitle: 'A Web of Life',
      description:
        'Expand resources & knowledge, build a network of networks where anyone can level up, find meaningful projects to contribute to & start earning.',
    },
  ];

  // needs to be migrated to hasura by someone who can use the hasura console
  // i have the m1 situation going on, still can't run the console, pls help
  const cards = [
    {
      image: Inkeeping.src,
      title: 'Innkeeping',
      about:
        'MetaFam is the founding guild of MetaGame. The goal is to make it a desirable community to be a part of by organizing events, making sure contributors are rewarded & more.',
      skills: [
        'Community Cultivation',
        'Learning & Education',
        'Ops / Coordination',
        'Moderation',
        'Project Management',
        'Customer Service',
        'Recruiting',
        'Operations',
        'Accounting',
      ].map(
        (skill) =>
          choices?.find((choice) => choice.name === skill) || {
            name: skill,
            category: SkillCategory_Enum.Technologies,
          },
      ),
    },
    {
      image: MetaMedia.src,
      title: 'MetaMedia',
      about:
        'MetaMedia is MetaGame’s content production tentacle, all about producing educational & promotional content of all formats, from the audio podcast to video recordings of events.',
      skills: [
        'Content Creation',
        'Learning & Education',
        'Memes',
        'Social Media',
        'Marketing / Sales',
        'Web Design',
        'Graphics Design',
        'Art / Illustration',
        'Video Production',
        'Photography',
        'Audiovisual',
        'Fashion Design',
      ].map(
        (skill) =>
          choices?.find((choice) => choice.name === skill) || {
            name: skill,
            category: SkillCategory_Enum.Technologies,
          },
      ),
    },
    {
      image: MetaOS.src,
      title: 'MetaOS',
      about:
        'MetaOS is an operating system for interoperable communities, decentralized societies & coordination games. A mosaic of web3 building blocks put together into a coherent platform.',
      skills: [
        'React',
        'Node.js',
        'Solidity',
        'TypeScript',
        'NextJS',
        'CSS',
        'Chakra UI',
        'Ceramic',
        'UI/UX',
        'Hasura',
        'Project Management',
        'DevOps',
        'Game Development',
        'Web Design',
        'Token Engineering',
      ].map(
        (skill) =>
          choices?.find((choice) => choice.name === skill) || {
            name: skill,
            category: SkillCategory_Enum.Technologies,
          },
      ),
    },
  ];

  return (
    <PageContainer py={8} px={[6, 6, 20, 24]}>
      <VStack maxW="7xl" w="100%" spacing={{ base: 4, md: 8 }}>
        <HeadComponent
          title="MetaGame Raids Page"
          description="See which raids are currently ongoing, learn more about them &amp; get involved"
          url="https://my.metagame.wtf/raids"
        />

        <Heading
          as="h1"
          fontSize="5xl"
          fontWeight="bold"
          color="white"
          fontFamily="mono"
          mb={[4, 4, 4, 12]}
          display="flex"
          flexDir="row"
          ref={topRef}
        >
          Raids
        </Heading>

        <Flex
          background="whiteAlpha.50"
          borderRadius={10}
          p={7}
          gap={6}
          flexDir="column"
        >
          <Flex gap={6}>
            {phases.map(({ title, subtitle, description }, index) => (
              <Box key={title}>
                <Flex alignItems="baseline" justifyContent="center">
                  <Text fontWeight={700} fontSize={36}>
                    Phase {convertToRoman(index + 1)} -{' '}
                    <Text
                      as="span"
                      fontStyle="italic"
                      fontWeight={400}
                      fontSize={32}
                    >
                      {title}
                    </Text>
                  </Text>
                </Flex>

                <Text
                  color="blueLight"
                  fontStyle="italic"
                  fontSize={20}
                  textAlign="center"
                  mb={3}
                >
                  {subtitle}
                </Text>
                <Text fontWeight={400} fontSize={14}>
                  {description}
                </Text>
              </Box>
            ))}
          </Flex>
          <Box w="full" pos="relative">
            <Progress
              value={28}
              borderRadius={10}
              colorScheme="teal"
              background="blackAlpha.400"
              position="absolute"
              w="full"
            />
            <Divider
              pos="absolute"
              left="33%"
              orientation="vertical"
              h={3}
              borderColor="blueLight"
            />
            <Divider
              pos="absolute"
              left="66%"
              orientation="vertical"
              h={3}
              borderColor="blueLight"
            />
          </Box>
        </Flex>

        <Flex gap={6}>
          {cards.map(({ image, title, about, skills }) => (
            <MetaTile>
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
                    {title}
                  </Heading>
                </Flex>
              </MetaTileHeader>
              <MetaTileBody justifyContent="space-between">
                <Flex flexDir="column" gap={2}>
                  <VStack spacing={2} align="stretch">
                    <Text textStyle="caption">ABOUT</Text>
                    <Text fontSize="sm">{about}</Text>
                  </VStack>
                  <Flex align="stretch" flexDir="column" gap={3}>
                    <Text textStyle="caption">Skills</Text>
                    <Wrap transition="opacity 0.4s">
                      {skills.map(({ name, category }, index) => (
                        <WrapItem key={name + index}>
                          <MetaTag
                            size="sm"
                            fontWeight="normal"
                            backgroundColor={
                              SkillColors[category as SkillCategory_Enum]
                            }
                          >
                            {name}
                          </MetaTag>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </Flex>
                </Flex>
              </MetaTileBody>
            </MetaTile>
          ))}
        </Flex>

        <AspectRatio mb={4} ratio={{ base: 3 / 4, md: 9 / 6 }}>
          <Box
            as="iframe"
            title="MetaGame Raids on Miro"
            src="https://miro.com/app/live-embed/uXjVOmrCvsw=/?moveToViewport=-23399,-15417,32264,27285&embedId=17519047502"
            allowFullScreen
          />
        </AspectRatio>

        <Image src={Octopus.src} pt={8} />
        <Box pb={4}>
          <Button
            leftIcon={<ArrowUpIcon />}
            variant="ghost"
            color="whiteAlpha.700"
            bgColor="whiteAlpha.50"
            _hover={{ bg: 'whiteAlpha.200' }}
            _active={{ bg: 'whiteAlpha.200' }}
            onClick={handleBackClick}
          >
            Back to top
          </Button>
        </Box>
      </VStack>
    </PageContainer>
  );
};

export default RaidsPage;
