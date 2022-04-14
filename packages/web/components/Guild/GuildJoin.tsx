import {
  Box,
  Flex,
  Image,
  ListItem,
  MetaButton,
  MetaHeading,
  Text,
  UnorderedList,
} from '@metafam/ds';
import { Constants, generateUUID } from '@metafam/utils';
import { FlexContainer } from 'components/Container';
import { MetaLink } from 'components/Link';
import { CONFIG } from 'config';
import { useUser } from 'lib/hooks';
import { get, set } from 'lib/store';
import React, { useEffect, useState } from 'react';

export const discordAuthStateGuidKey = 'metagame-add-guild';

export const GuildJoin: React.FC = () => {
  const { user } = useUser();
  const discordOAuthCallbackURL = `${CONFIG.publicURL}/${Constants.DISCORD_OAUTH_CALLBACK_PATH}`;

  const [stateGuid, setStateGuid] = useState<string>();

  useEffect(() => {
    let guid = get(discordAuthStateGuidKey);
    if (guid == null) {
      guid = generateUUID();
      set(discordAuthStateGuidKey, guid);
    }
    setStateGuid(guid);
  }, [setStateGuid]);

  const discordAuthParams = new URLSearchParams({
    response_type: 'code',
    client_id: Constants.DISCORD_BOT_CLIENT_ID,
    // This will be passed-back and verified after the Discord auth redirect
    state: stateGuid as string,
    permissions: Constants.JOIN_GUILD_DISCORD_BOT_PERMISSIONS,
    redirect_uri: encodeURI(discordOAuthCallbackURL),
    scope: Constants.JOIN_GUILD_DISCORD_OAUTH_SCOPES,
  });

  const discordAuthURL = `${
    CONFIG.discordApiBaseUrl
  }/oauth2/authorize?${discordAuthParams.toString()}`;

  return (
    <FlexContainer flex="1" justify="start" mt={5}>
      <MetaHeading textAlign="center" mb={10}>
        Join MetaGame as Guild
      </MetaHeading>
      <Box
        bg="whiteAlpha.200"
        style={{ backdropFilter: 'blur(7px)' }}
        rounded="lg"
        p="6"
        my="6"
        w="100%"
        maxW={['100%', '60rem']}
      >
        <Image
          src="/assets/guilds.png"
          alt="Guild"
          maxW={['14rem', '20rem']}
          p={4}
          float={['none', 'none', 'right']}
        />
        <Box>
          <JoinCopy />
          <Text pt={8}>
            To apply, your guild must have a{' '}
            <MetaLink isExternal href="https://discord.com/">
              Discord
            </MetaLink>{' '}
            server.
          </Text>
          {stateGuid?.length && user ? (
            <>
              <Text pt={4}>
                Clicking the link below will redirect to a Discord page asking
                for your permission to collect certain relevant information
                about your guild.
              </Text>
              <MetaButton
                size="lg"
                maxW="15rem"
                mt={4}
                as="a"
                href={discordAuthURL}
              >
                Apply to Join
              </MetaButton>
            </>
          ) : (
            <Flex fontStyle="italic" mt={4}>
              Please log in or create a player profile by pressing the "Connect"
              button to start the guild setup process.
            </Flex>
          )}
        </Box>
      </Box>
    </FlexContainer>
  );
};

export const JoinCopy: React.FC = () => {
  const css = {
    '.header': {
      marginTop: 5,
      marginBottom: 1,
      fontSize: 'xl',
      color: 'blueLight',
    },
    '& br': {
      marginBottom: 2,
    },
    p: {
      lineHeight: '1.4em',
    },
    div: {
      marginTop: 2,
      marginBottom: 2,
    },
    ul: {
      marginBottom: 3,
      marginTop: 1,
      li: {
        fontSize: 'sm',
        ul: {
          marginBottom: 1,
        },
      },
    },
  };

  return (
    <Box sx={css}>
      <Text mt={{ xs: 8, sm: 0 }}>
        Hello Guilder!
        <br />
        Thinking maybe your project should join MetaGame but aren't sure?
      </Text>
      <Text className="header">Introduction</Text>
      <Box>
        At MetaGame, we believe Ethereum is a core technology for building
        socioeconomic systems of the future &amp; DAOs are how we get there. We
        are building an Onboarding Machine &amp; A Decentralized Factory for
        this fledgling Ethereum DAO ecosystem &amp; the people that want to take
        part in building the future.
        <br />
        Our first goal is to build a place for people to learn what these
        technologies mean for them &amp; how they can start contributing, then
        support the people &amp; projects that are building different pieces of
        this “decentralized society” puzzle in any way we can.
        <br />
        We are looking for projects that are either building pieces of the
        infrastructure for the society of the future, offering tools &amp;
        services to those that are, or just doing something cool.
        <Box fontStyle="italic">
          Please have a clear vision of how you fit in as a piece of this puzzle
          &amp; ethos before trying to join.
        </Box>
        <Box fontWeight="bold">Think:</Box>
      </Box>
      <UnorderedList>
        <ListItem>
          How does my DAO fit into this “Decentralized Factory”?
        </ListItem>
        <ListItem>
          If it doesn't, does it at least fit as a part of this “building a new
          world” narrative? (We'll be accepting DAOs ranging from artist or
          gamer collectives to activist groups.)
        </ListItem>
      </UnorderedList>
      <Text fontWeight="bold">Read more about MetaGame:</Text>
      <UnorderedList>
        <ListItem>
          <MetaLink href="/">MetaGame</MetaLink>
        </ListItem>
        <ListItem>
          <MetaLink href="/learn/wiki">WTF Is MetaGame</MetaLink>
        </ListItem>
        <ListItem>
          <MetaLink
            isExternal
            href="https://wiki.metagame.wtf/docs/wtf-is-metagame/narrative-1-a-decentralized-factory"
          >
            A Decentralized Factory
          </MetaLink>
        </ListItem>
        <ListItem>
          <MetaLink
            isExternal
            href="https://wiki.metagame.wtf/docs/how-does-it-work/phases-of-metagame"
          >
            Phases of MetaGame
          </MetaLink>
        </ListItem>
        <ListItem>
          <MetaLink
            isExternal
            href="https://wiki.metagame.wtf/docs/wtf-is-metagame/metafam-way"
          >
            The MetaManifesto
          </MetaLink>
        </ListItem>
        <ListItem>
          <MetaLink
            isExternal
            href="https://wiki.metagame.wtf/docs/enter-metagame/why-patron"
          >
            Why Become a Patron
          </MetaLink>
        </ListItem>
      </UnorderedList>
      <Text className="header">Why join?</Text>
      <Text>A few reasons, actually!</Text>
      <UnorderedList>
        <ListItem>
          Because you feel aligned with the vision &amp; want to be a piece of
          this “new world” puzzle
        </ListItem>
        <ListItem>
          You want access to a network of pioneers, helpers, stress testers
          &amp; early adopters
        </ListItem>
        <ListItem>
          You need access or connections to all knowledge &amp; other resources
          you need for realizing your project. Eventually, a nice interface for
          accessing all of the above &amp; more:
        </ListItem>
        <ListItem>
          Eg. service offering, role opening &amp; quest requesting boards on{' '}
          <MetaLink href="/">MetaGame</MetaLink> to help guilds exchange what
          they need amongst each other.
        </ListItem>
      </UnorderedList>
      <Text className="header">Requirements</Text>
      <Text>
        Before wasting your time applying, please have a read through what makes
        a good fit:
      </Text>
      <UnorderedList>
        <ListItem>
          At least one of your members is already a{' '}
          <MetaLink
            isExternal
            href="https://wiki.metagame.wtf/docs/enter-metagame/join-metagame"
          >
            player or patron of MetaGame
          </MetaLink>
        </ListItem>
        <ListItem>
          You're doing something useful in the Ethereum DAO ecosystem, such as:
          <UnorderedList>
            <ListItem>Building a DAO, a dApp, a protocol or a tool</ListItem>
            <ListItem>Providing a service for other DAOs or guilders</ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>
          Doing something good for the world, outside or vaguely related to
          crypto
        </ListItem>
        <ListItem>Doing all of the above</ListItem>
      </UnorderedList>

      <Text>
        After convincing us you're doing something useful &amp; passing the
        initial alignment check, there is essentially one requirement:
      </Text>
      <UnorderedList>
        <ListItem>
          Signal your alignment with the{' '}
          <MetaLink
            isExternal
            href="https://wiki.metagame.wtf/docs/wtf-is-metagame/metafam-way"
          >
            The MetaManifesto
          </MetaLink>
          <UnorderedList>
            <ListItem>
              By putting your money where your mouth is; donate to a
              philanthropic or ecological initiative of your choosing through
              Giveth or another organization of your choosing.
            </ListItem>
            <ListItem>
              By buying a{' '}
              <MetaLink
                isExternal
                href="https://meta-game.notion.site/MetaManifesto-047636a7ecc549b69005e41d272ce7ed"
              >
                MetaManifesto NFT
              </MetaLink>{' '}
              and/or some Seeds.
            </ListItem>
          </UnorderedList>
        </ListItem>
      </UnorderedList>

      <Text className="header">Then What?</Text>
      <Box>
        Then its onto making it known, finding more points of alignment and
        collaborating!
      </Box>
      <Box>Here's what we usually do:</Box>
      <UnorderedList>
        <ListItem>
          You join as a patron & subscribe to our announcement channel, we do
          the same
        </ListItem>
        <ListItem>We announce the new guild onboarding</ListItem>
        <ListItem>
          We record a podcast episode with one of the founders
        </ListItem>
        <ListItem>We organize a guild2guild meetup</ListItem>
        <ListItem>
          You join the group of representatives of all the guilds
        </ListItem>
        <ListItem>We do whatever else you suggest</ListItem>
        <ListItem>
          All the while, we discuss things we could collaborate on or help each
          other with
        </ListItem>
      </UnorderedList>
      <Text>
        Any questions? Ask in{' '}
        <MetaLink isExternal href="https://discord.gg/6JFXC9T">
          ⁉-ask-anything
        </MetaLink>{' '}
        or get in touch with @petheth.
      </Text>
    </Box>
  );
};
