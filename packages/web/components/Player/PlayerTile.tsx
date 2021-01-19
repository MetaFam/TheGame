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
} from 'utils/playerHelpers';

type Props = {
  player: PlayerFragmentFragment;
};

const SHOW_MEMBERSHIPS = 4;
const SHOW_SKILLS = 4;

export const PlayerTile: React.FC<Props> = ({ player }) => (
  <Flex
    direction="column"
    key={player.id}
    bg="whiteAlpha.200"
    style={{ backdropFilter: 'blur(7px)' }}
    rounded="lg"
    p="6"
    maxW="30rem"
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
          <Avatar
            size="xl"
            src={getPlayerImage(player)}
            name={getPlayerName(player)}
          />
          <Heading size="xs" color="white">
            {getPlayerName(player)}
          </Heading>
        </VStack>
      </MetaLink>
      <Wrap w="100%" justify="center">
        {player.playerType?.title ? (
          <MetaTag size="md">{player.playerType?.title.toUpperCase()}</MetaTag>
        ) : null}
        {player.rank && (
          <MetaTag
            backgroundColor={player.rank?.toLowerCase()}
            size="md"
            color="blackAlpha.600"
          >
            {player.rank}
          </MetaTag>
        )}
        <MetaTag size="md">XP: {Math.floor(player.total_xp)}</MetaTag>
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
      {player.player_skills.length ? (
        <VStack spacing={2} align="stretch">
          <Text fontFamily="mono" fontSize="sm" color="blueLight">
            SKILLS
          </Text>
          <Wrap>
            {player.player_skills.slice(0, SHOW_SKILLS).map(({ skill }) => (
              <MetaTag
                key={skill.id}
                size="md"
                fontWeight="normal"
                backgroundColor={SkillColors[skill.category]}
              >
                {skill.name}
              </MetaTag>
            ))}
            {player.player_skills.length > SHOW_SKILLS && (
              <MetaTag size="md" fontWeight="normal">
                {`+${player.player_skills.length - SHOW_SKILLS}`}
              </MetaTag>
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
                <MetaTag key={member.id} size="md" fontWeight="normal">
                  {member.moloch.title}
                </MetaTag>
              ))}
            {player.daohausMemberships.length > SHOW_MEMBERSHIPS && (
              <MetaTag size="md" fontWeight="normal">
                {`+${player.daohausMemberships.length - SHOW_MEMBERSHIPS}`}
              </MetaTag>
            )}
          </Wrap>
        </VStack>
      ) : null}

      {player.player_accounts.length ? (
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
