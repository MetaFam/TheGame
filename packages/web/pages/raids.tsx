import {
  Box,
  Divider,
  Flex,
  Heading,
  Link,
  LoadingState,
  MetaTag,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Progress,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import Loader from 'assets/Loader.svg';
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [choices, setChoices] = useState<Array<PlayerSkillFragment>>();
  const [titleModal, setTitle] = useState('');
  const [deworkURLModal, setDeworkURL] = useState('');
  const mobile = useBreakpointValue({ base: true, md: false });

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
      ].map(
        (skill) =>
          choices?.find((choice) => choice.name === skill) || {
            name: skill,
            category: SkillCategory_Enum.Technologies,
          },
      ),
      deworkURL: 'https://app.dework.xyz/i/3pzC2MA26cQgQPPvXHBBhx',
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
      ].map(
        (skill) =>
          choices?.find((choice) => choice.name === skill) || {
            name: skill,
            category: SkillCategory_Enum.Technologies,
          },
      ),
      deworkURL: 'https://app.dework.xyz/i/3i6qYuZldmidkjejmWAeFh',
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
      ].map(
        (skill) =>
          choices?.find((choice) => choice.name === skill) || {
            name: skill,
            category: SkillCategory_Enum.Technologies,
          },
      ),
      deworkURL: 'https://app.dework.xyz/i/1rvHsAPorh2IsdaQAwYdpC',
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
          fontFamily="exo2"
          mb={[4, 4, 4, 12]}
          display="flex"
          flexDir="row"
          ref={topRef}
        >
          Raids
        </Heading>

        <Link
          href="https://wiki.metagame.wtf/how-does-it-work/phases-of-metagame"
          isExternal
          _hover={{
            underline: 'none',
          }}
        >
          <Flex
            bgColor="whiteAlpha.200"
            transition="background 0.2s ease"
            _hover={{
              bgColor: 'whiteAlpha.300',
            }}
            borderRadius={10}
            p={7}
            gap={{ base: 10, md: 6 }}
            direction={{ base: 'row', md: 'column' }}
            pos="relative"
          >
            <Flex
              gap={6}
              direction={{
                base: 'column',
                md: 'row',
              }}
            >
              {phases.map(({ title, subtitle, description }, index) => (
                <Box key={title}>
                  <Flex alignItems="baseline" justifyContent="center">
                    <Text
                      fontWeight="bold"
                      fontSize={{ base: 30, md: 36 }}
                      textAlign="center"
                    >
                      Phase {convertToRoman(index + 1)} -{' '}
                      <Text
                        as="span"
                        fontStyle="italic"
                        fontWeight="normal"
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
                  <Text fontWeight="normal" fontSize={14}>
                    {description}
                  </Text>
                </Box>
              ))}
            </Flex>
            {mobile && <MobileProgressBar />}
            {!mobile && <ProgressBar />}
          </Flex>
        </Link>

        <Flex
          gap={6}
          pb={16}
          direction={{
            base: 'column',
            lg: 'row',
          }}
        >
          {cards.map(({ image, title, about, skills, deworkURL }) => (
            <MetaTile
              onClick={() => {
                setTitle(title);
                setDeworkURL(deworkURL);
                onOpen();
              }}
              cursor="pointer"
            >
              <MetaTileHeader>
                <SquareImage src={image} />

                <Flex px={3} w="full" pos="absolute" bottom={-6} zIndex={1}>
                  <Heading
                    size="lg"
                    color="white"
                    bgColor="alphaWhite.100"
                    backdropFilter="blur(10px)"
                    lineHeight={1.8}
                    justifyContent="center"
                    px={3}
                    width="full"
                    textAlign="center"
                    borderRadius={10}
                    fontFamily="body"
                    fontWeight="normal"
                  >
                    {title}
                  </Heading>
                </Flex>
              </MetaTileHeader>
              <MetaTileBody justifyContent="space-between">
                <Flex direction="column" gap={2}>
                  <VStack spacing={2} align="stretch">
                    <Text textStyle="caption">About</Text>
                    <Text fontSize="sm">{about}</Text>
                  </VStack>
                  <Flex align="stretch" direction="column" gap={3}>
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
        <Modal {...{ isOpen, onClose }} size="full">
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody
              display="flex"
              width="100%"
              height="100%"
              flexDir="column"
              background={`url(${Loader.src})`}
              backgroundPosition="center center"
              backgroundRepeat="no-repeat"
            >
              <Box
                as="iframe"
                title={titleModal}
                src={deworkURLModal}
                allowFullScreen
                flexGrow={1}
                border="none"
                margin={0}
                padding={0}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </PageContainer>
  );
};

export default RaidsPage;

const currentProgress = 28;

const ProgressBar = () => (
  <Box w="full" pos="relative">
    <Progress
      isAnimated
      value={currentProgress}
      borderRadius={10}
      colorScheme="teal"
      background="blackAlpha.400"
      position="absolute"
      w="full"
    />
    <Divider
      pos="absolute"
      left="calc(100%/3)"
      orientation="vertical"
      h={3}
      borderColor="blueLight"
    />
    <Divider
      pos="absolute"
      left="calc(100%/3 * 2)"
      orientation="vertical"
      h={3}
      borderColor="blueLight"
    />
  </Box>
);

const MobileProgressBar = () => (
  <Box w={5} borderRadius={10} background="blackAlpha.400">
    <Box backgroundColor="teal" borderRadius={10} h={`${currentProgress}%`} />
    <Divider
      pos="absolute"
      top="calc(100%/3)"
      orientation="horizontal"
      w={3}
      borderColor="blueLight"
    />
    <Divider
      pos="absolute"
      top="calc(100%/3 * 2)"
      orientation="horizontal"
      w={3}
      borderColor="blueLight"
    />
  </Box>
);
