import {
  Avatar,
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
import { getPlayerImage, getPlayerName } from 'utils/playerHelpers';

type Props = {
  player: PlayerFragmentFragment;
};

const SHOW_MEMBERSHIPS = 4;
const SHOW_SKILLS = 4;

export const PlayerTile: React.FC<Props> = ({ player }) => (
  <VStack
    key={player.id}
    bg="whiteAlpha.200"
    style={{ backdropFilter: 'blur(7px)' }}
    rounded="lg"
    py="6"
    px="4"
    spacing="6"
    w="100%"
  >
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
        <Heading size="xs">{getPlayerName(player)}</Heading>
      </VStack>
    </MetaLink>
    <Wrap>
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
      <MetaTag size="md">XP: {Math.floor(player.totalXp)}</MetaTag>
    </Wrap>
    {player.Player_Skills.length ? (
      <VStack spacing={2}>
        <Text fontFamily="mono" fontSize="sm" color="blueLight">
          SKILLS
        </Text>
        <Wrap justify="center">
          {player.Player_Skills.slice(0, SHOW_SKILLS).map(({ Skill }) => (
            <MetaTag
              key={Skill.id}
              size="md"
              fontWeight="normal"
              backgroundColor={SkillColors[Skill.category]}
            >
              {Skill.name}
            </MetaTag>
          ))}
          {player.Player_Skills.length > SHOW_SKILLS && (
            <MetaTag size="md" fontWeight="normal">
              {`+${player.Player_Skills.length - SHOW_SKILLS}`}
            </MetaTag>
          )}
        </Wrap>
      </VStack>
    ) : null}

    {player.daohausMemberships.length ? (
      <VStack spacing={2}>
        <Text fontFamily="mono" fontSize="sm" color="blueLight">
          MEMBER OF
        </Text>
        <Wrap justify="center">
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

    {player.Accounts.length ? (
      <VStack spacing={2}>
        <Text fontFamily="mono" fontSize="sm" color="blueLight">
          CONTACT
        </Text>
        <HStack mt="2">
          <PlayerContacts player={player} />
        </HStack>
      </VStack>
    ) : null}
  </VStack>
);
