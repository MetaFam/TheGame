import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  MetaButton,
  Text,
  UnorderedList,
  VStack,
} from '@metafam/ds';
import PatronsImg from 'assets/patrons-sun_800x820.webp';
import PlayersImg from 'assets/players-sun_800x822.webp';
import ThinkingEmojiImg from 'assets/thinking-emoji_400x400.webp';
import Image from 'next/image';
import React from 'react';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';

export const Requirements: React.FC = () => (
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
      Requirements
    </Heading>

    <VStack spacing={6}>
      <Center>
        <Text>
          Before trying to join as a guild, it is recommended you join as a
          player or a patron first&hellip;
        </Text>
      </Center>

      {/* 
        The cards (VStacks) are stacked until the lg breakpoint is reached
        Then they are displayed in a row             
      */}
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          className="mg-guild-join-card-bg" // CSS class defined in packages/web/pages/Guild/Join/index.tsx
          maxW={{ base: 'md', lg: '21rem' }}
          p={8}
        >
          <VStack spacing={2}>
            <Image
              src={PlayersImg.src}
              alt="Cloaked player facing sun"
              style={{ margin: 'auto' }}
              // maxH={{ md: '20rem', lg: '12rem' }}
            />
            <Text
              color="white"
              fontFamily="mono"
              fontSize="lg"
              fontWeight={200}
            >
              Become a Player
            </Text>
            <Text color="white" fontWeight={200}>
              Players are the ones <Text as="em">actively</Text> contributing
              towards the realization of MetaGame.
            </Text>
            <Box>
              <MetaButton
                as="a"
                bg="#E839B7"
                borderRadius={0}
                color="white"
                href="/play/paths/engaged-octos-path"
                minW="10rem"
                mt={2}
                px={6}
                _hover={{
                  backgroundColor: 'rgba(232, 57, 183, 0.6)',
                }}
                _active={{
                  backgroundColor: 'rgba(232, 57, 183, 0.6)',
                  transform: 'scale(0.8)',
                }}
              >
                LFG!
              </MetaButton>
            </Box>
          </VStack>
        </Box>

        <Box textAlign="center" p={9}>
          <Text color="white" fontFamily="mono" fontSize="lg">
            OR
          </Text>
        </Box>

        <Box
          className="mg-guild-join-card-bg"
          maxW={{ base: 'md', lg: '21rem' }}
          p={8}
        >
          <VStack spacing={2}>
            <Image
              src={PatronsImg.src}
              alt="Cloaked patron facing sun"
              style={{ margin: 'auto' }}
              // maxH={{ md: '20rem', lg: '12rem' }}
            />
            <Text
              color="white"
              fontFamily="mono"
              fontSize="lg"
              fontWeight={200}
            >
              Become a Patron
            </Text>
            <Text color="white" fontWeight={200}>
              Patrons are the ones <Text as="em">passively</Text> contributing
              towards the realization of MetaGame.
            </Text>
            <Box>
              <MetaButton
                as="a"
                bg="#E839B7"
                borderRadius={0}
                color="white"
                href="https://metagame.wtf/join/patron"
                minW="10rem"
                mt={2}
                px={6}
                _hover={{
                  backgroundColor: 'rgba(232, 57, 183, 0.6)',
                }}
                _active={{
                  backgroundColor: 'rgba(232, 57, 183, 0.6)',
                  transform: 'scale(0.8)',
                }}
              >
                LFG!
              </MetaButton>
            </Box>
          </VStack>
        </Box>
      </Flex>

      <Center>
        <Text fontSize="lg">
          Then think: is your guild a good fit for MetaGame?
        </Text>
      </Center>

      {/*
          The two flex items are stacked until the md breakpoint, then go to columns
      */}
      <Container className="mg-guild-join-card-bg" maxW="3xl" p={8}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={ThinkingEmojiImg.src}
            alt="🤔"
            style={{ margin: 'auto' }}
            // maxW="10rem"
            // mb={{ base: 8, md: 0 }}
          />

          <Box ml={{ base: 0, md: 8 }} flex="auto">
            <Text mb={4}>You need to tick at least 2 of these boxes!</Text>

            <List mb={4}>
              <ListItem>
                <ListIcon as={MdCheckBoxOutlineBlank} />
                At least one of your members is a member of MetaGame
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckBoxOutlineBlank} />
                You’re doing something useful for the DAO ecosystem
                <Box ml="1.5em">
                  👉 Building a DAO, a dApp, a protocol or a tool?
                  <br />
                  👉 Providing a service to other DAOs?
                </Box>
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckBoxOutlineBlank} />
                You’re doing something good for the world
                <Box ml="1.5em">
                  👉 Should be outside or vaguely related to crypto (Regens
                  FTW!)
                </Box>
              </ListItem>
            </List>
          </Box>
        </Flex>
      </Container>

      <Center>
        <Text fontSize="lg">Finally&hellip;</Text>
      </Center>

      <Container className="mg-guild-join-card-bg" maxW="3xl" p={8}>
        <Text mb={4}>
          After making sure you’re a good fit, there is essentially one
          requirement&hellip;
        </Text>
        <Text>You’ll need to signal your alignment with the MetaManifesto</Text>
        <UnorderedList mb={4}>
          <ListItem>
            By donating to a humanitarian or ecological initiative of your
            choosing.
          </ListItem>
          <ListItem>
            By buying a MetaManifesto NFT and/or{' '}
            <Link
              className="gradient"
              href="https://metagame.wtf/seeds"
              title="Read about Seeds and how you can water them"
            >
              watering Seeds
            </Link>
            .
          </ListItem>
        </UnorderedList>
        <Text as="em">
          Note: Long term, all guilds will be expected to periodically offset
          their carbon footprint &amp;/or donate to other good (non-crypto)
          causes.
        </Text>
      </Container>
    </VStack>
  </Container>
);
