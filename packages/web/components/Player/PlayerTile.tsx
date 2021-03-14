import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  MetaTag,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { PlayerContacts } from 'components/Player/PlayerContacts';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { SkillColors } from 'graphql/types';
import React from 'react';
import {
  getPlayerCoverImage,
  getPlayerImage,
  getPlayerName,
  hasPlayerImage,
} from 'utils/playerHelpers';

type Props = {
  player: PlayerFragmentFragment;
};

const SHOW_MEMBERSHIPS = 4;
const SHOW_SKILLS = 4;

export const PlayerTile: React.FC<Props> = ({ player }) => {
  const avatar = hasPlayerImage(player) ? (
    <Avatar
      size="xl"
      bg=""
      src={getPlayerImage(player)}
      name={getPlayerName(player)}
    />
  ) : (
    <Avatar
      size="xl"
      src={getPlayerImage(player)}
      name={getPlayerName(player)}
    />
  );
  return (
    <Flex
      direction="column"
      key={player.id}
      bg="whiteAlpha.200"
      style={{ backdropFilter: 'blur(7px)' }}
      rounded="lg"
      p="6"
      maxW="25rem" // (2 / 3.5) = ~0.571 aspect ratio desired
      w="100%"
      align="stretch"
      position="relative"
      overflow="hidden"
      justify="space-between"
    >
      <Box
        bgImage={`url(${getPlayerCoverImage(player)})`}
        bgSize="cover"
        bgPosition="center"
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="4.5rem"
      />
      <VStack w="100%" spacing="6" align="stretch" mb={6} position="relative">
        <MetaLink
          as={`/player/${player.username}`}
          href="/player/[username]"
          key={player.id}
        >
          <VStack>
            {avatar}
            <Heading size="xs" color="white">
              {getPlayerName(player)}
            </Heading>
          </VStack>
        </MetaLink>
        <Wrap w="100%" justify="center">
          {player.playerType?.title ? (
            <WrapItem>
              <MetaTag size="md">
                {player.playerType?.title.toUpperCase()}
              </MetaTag>
            </WrapItem>
          ) : null}
          {player.rank && (
            <WrapItem>
              <MetaTag
                backgroundColor={player.rank?.toLowerCase()}
                size="md"
                color="blackAlpha.600"
              >
                {player.rank}
              </MetaTag>
            </WrapItem>
          )}
          <WrapItem>
            <MetaTag size="md">XP: {Math.floor(player.total_xp)}</MetaTag>
          </WrapItem>
        </Wrap>
        {player.box_profile?.description ? (
          <VStack spacing={2} align="stretch">
            <Text fontFamily="mono" fontSize="sm" color="blueLight">
              ABOUT
            </Text>
            <Text fontSize="sm">{player.box_profile.description}</Text>
          </VStack>
        ) : null}
      </VStack>
      <VStack w="100%" spacing="6" align="stretch">
        {player.Player_Skills.length ? (
          <VStack spacing={2} align="stretch">
            <Text fontFamily="mono" fontSize="sm" color="blueLight">
              SKILLS
            </Text>
            <Wrap>
              {player.Player_Skills.slice(0, SHOW_SKILLS).map(({ Skill }) => (
                <WrapItem key={Skill.id}>
                  <MetaTag
                    size="md"
                    fontWeight="normal"
                    backgroundColor={SkillColors[Skill.category]}
                  >
                    {Skill.name}
                  </MetaTag>
                </WrapItem>
              ))}
              {player.Player_Skills.length > SHOW_SKILLS && (
                <WrapItem>
                  <MetaTag size="md" fontWeight="normal">
                    {`+${player.Player_Skills.length - SHOW_SKILLS}`}
                  </MetaTag>
                </WrapItem>
              )}
            </Wrap>
          </VStack>
        ) : null}

        {player.daohausMemberships.length ? (
          <VStack spacing={2} align="stretch">
            <Text fontFamily="mono" fontSize="sm" color="blueLight">
              MEMBER OF
            </Text>
            <Wrap>
              {player.daohausMemberships
                .slice(0, SHOW_MEMBERSHIPS)
                .map((member) => (
                  <WrapItem key={member.id}>
                    <MetaTag size="md" fontWeight="normal">
                      {member.moloch.title}
                    </MetaTag>
                  </WrapItem>
                ))}
              {player.daohausMemberships.length > SHOW_MEMBERSHIPS && (
                <WrapItem>
                  <MetaTag size="md" fontWeight="normal">
                    {`+${player.daohausMemberships.length - SHOW_MEMBERSHIPS}`}
                  </MetaTag>
                </WrapItem>
              )}
            </Wrap>
          </VStack>
        ) : null}

        {player.Accounts.length ? (
          <VStack spacing={2} align="stretch">
            <Text fontFamily="mono" fontSize="sm" color="blueLight">
              CONTACT
            </Text>
            <HStack mt="2">
              <PlayerContacts player={player} />
            </HStack>
          </VStack>
        ) : null}
      </VStack>
    </Flex>
  );
};
