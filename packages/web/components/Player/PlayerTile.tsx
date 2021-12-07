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
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { PlayerContacts } from 'components/Player/PlayerContacts';
import { PlayerTileMemberships } from 'components/Player/PlayerTileMemberships';
import { SkillsTags } from 'components/Skills';
import { PlayerFragmentFragment, Skill } from 'graphql/autogen/types';
import NextLink from 'next/link';
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
  showSeasonalXP?: boolean;
};

const MAX_BIO_LENGTH = 240;

export const PlayerTile: React.FC<Props> = ({
  player,
  showSeasonalXP = false,
}) => {
  const { timeZone, offset } = useMemo(
    () => getPlayerTimeZoneDisplay(player.timeZone),
    [player.timeZone],
  );
  const description = getPlayerDescription(player);
  const displayDescription =
    description?.length > MAX_BIO_LENGTH
      ? `${description.substring(0, MAX_BIO_LENGTH - 9)}…`
      : description;

  console.info({ player });

  return (
    <LinkBox>
      <MetaTile>
        <Box
          bgImage={`url(${getPlayerCoverImage(player)})`}
          bgSize="cover"
          bgPosition="center"
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="4.5rem"
        />
        <NextLink
          as={`/player/${player.username}`}
          href="/player/[username]"
          passHref
        >
          <LinkOverlay>
            <MetaTileHeader>
              <VStack>
                <PlayerAvatar {...{ player }} size="xl" />
                <Heading size="xs" color="white">
                  {getPlayerName(player)}
                </Heading>
              </VStack>
              <Wrap w="100%" justify="center">
                {player.type?.title && (
                  <WrapItem>
                    <MetaTag size="md" textTransform="uppercase">
                      {player.type.title}
                    </MetaTag>
                  </WrapItem>
                )}
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
                  <MetaTag size="md">
                    {showSeasonalXP ? 'TOTAL XP: ' : 'XP: '}
                    {Math.floor(player.totalXP)}
                  </MetaTag>
                </WrapItem>
                {showSeasonalXP && (
                  <WrapItem>
                    <MetaTag size="md">
                      SEASON Ⅳ XP: {Math.floor(player.seasonXP)}
                    </MetaTag>
                  </WrapItem>
                )}
              </Wrap>
              {timeZone && (
                <HStack alignItems="baseline" w="auto" justify="center">
                  <FaGlobe color="blueLight" fontSize="0.875rem" />
                  <Text fontSize="lg">{timeZone}</Text>
                  {offset && <Text fontSize="sm">{offset}</Text>}
                </HStack>
              )}
              {displayDescription && (
                <VStack spacing={2} align="stretch" pt="0.5rem">
                  <Text textStyle="caption" textTransform="uppercase">
                    About
                  </Text>
                  <Text fontSize="sm">{displayDescription}</Text>
                </VStack>
              )}
            </MetaTileHeader>
          </LinkOverlay>
        </NextLink>
        <MetaTileBody>
          {player.skills?.length ? (
            <VStack spacing={2} align="stretch">
              <Text textStyle="caption" textTransform="uppercase">
                Skills
              </Text>
              <SkillsTags
                skills={
                  player.skills.map(({ Skill: skill }) => skill) as Skill[]
                }
              />
            </VStack>
          ) : null}

          <PlayerTileMemberships {...{ player }} />

          {player.accounts?.length && (
            <VStack spacing={2} align="stretch">
              <Text textStyle="caption" textTransform="uppercase">
                Contact
              </Text>
              <HStack mt={2}>
                <PlayerContacts {...{ player }} disableBrightId />
              </HStack>
            </VStack>
          )}
        </MetaTileBody>
      </MetaTile>
    </LinkBox>
  );
};
