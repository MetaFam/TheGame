import {
  Box,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  MetaTag,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { MetaLink } from 'components/Link';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { PlayerContacts } from 'components/Player/PlayerContacts';
import { PlayerTileMemberships } from 'components/Player/PlayerTileMemberships';
import { SkillsTags } from 'components/Skills';
import {
  PlayerFragmentFragment,
  /* Player_Update_Column, */ Skill,
} from 'graphql/autogen/types';
import React, { useMemo } from 'react';
import { FaGlobe } from 'react-icons/fa';
import { getPlayerTimeZoneDisplay } from 'utils/dateHelpers';
import {
  getPlayerCoverImage,
  getPlayerDescription,
  getPlayerName,
} from 'utils/playerHelpers';

type Props = {
  player: PlayerFragmentFragment;
};

const MAX_BIO_LENGTH = 240;

export const PlayerTile: React.FC<Props> = ({ player }) => {
  const tzDisplay = useMemo(() => getPlayerTimeZoneDisplay(player.timezone), [
    player.timezone,
  ]);
  const description = getPlayerDescription(player);
  const displayDescription =
    description && description.length > MAX_BIO_LENGTH
      ? `${description.substring(0, MAX_BIO_LENGTH - 9)}…`
      : description;
  return (
    <LinkBox>
      <LinkOverlay href={`/player/${player.username}`}>
        <MetaTile>
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
          <MetaTileHeader>
            <MetaLink
              as={`/player/${player.username}`}
              href="/player/[username]"
              key={player.id}
            >
              <VStack>
                <PlayerAvatar player={player} size="xl" />
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
                <MetaTag size="md">{`XP: ${Math.floor(
                  player.total_xp,
                )}`}</MetaTag>
              </WrapItem>
            </Wrap>
            {tzDisplay?.timeZone ? (
              <HStack alignItems="baseline" w="auto" justify="center">
                <FaGlobe color="blueLight" fontSize="0.875rem" />
                <Text fontSize="lg">{tzDisplay?.timeZone || '-'}</Text>
                {tzDisplay?.offset ? (
                  <Text fontSize="sm">{tzDisplay?.offset}</Text>
                ) : (
                  ''
                )}
              </HStack>
            ) : null}
            {displayDescription ? (
              <VStack spacing={2} align="stretch" pt="0.5rem">
                <Text textStyle="caption">ABOUT</Text>
                <Text fontSize="sm">{displayDescription}</Text>
              </VStack>
            ) : null}
          </MetaTileHeader>
          <MetaTileBody>
            {player.Player_Skills.length ? (
              <VStack spacing={2} align="stretch">
                <Text textStyle="caption">SKILLS</Text>
                <SkillsTags
                  skills={player.Player_Skills.map((s) => s.Skill) as Skill[]}
                />
              </VStack>
            ) : null}

            <PlayerTileMemberships player={player} />

            {player.Accounts.length ? (
              <VStack spacing={2} align="stretch">
                <Text textStyle="caption">CONTACT</Text>
                <HStack mt="2">
                  <PlayerContacts player={player} disableBrightId />
                </HStack>
              </VStack>
            ) : null}
          </MetaTileBody>
        </MetaTile>
      </LinkOverlay>
    </LinkBox>
  );
};
