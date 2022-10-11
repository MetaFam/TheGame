import {
  Box,
  getTimeZoneFor,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  MetaTag,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Text,
  TimeZoneType,
  Tooltip,
  VStack,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { getSeasonNum, Maybe } from '@metafam/utils';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { PlayerContacts } from 'components/Player/PlayerContacts';
import { PlayerTileMemberships } from 'components/Player/PlayerTileMemberships';
import { SkillsTags } from 'components/Quest/Skills';
import { Player, Skill } from 'graphql/autogen/types';
import NextLink from 'next/link';
import React, { useMemo } from 'react';
import { FaGlobe } from 'react-icons/fa';
import { convertToRoman } from 'utils/formatHelpers';
import {
  getPlayerBanner,
  getPlayerDescription,
  getPlayerName,
  getPlayerURL,
} from 'utils/playerHelpers';

type Props = {
  player: Player;
  showSeasonalXP?: boolean;
};

const MAX_BIO_LENGTH = 240;

export const PlayerTile: React.FC<Props> = ({
  player,
  showSeasonalXP = false,
}) => {
  const tz: Maybe<TimeZoneType> = useMemo(
    () => getTimeZoneFor({ location: player.profile?.timeZone ?? undefined }),
    [player.profile?.timeZone],
  );
  const description = getPlayerDescription(player);
  const displayDescription =
    (description?.length ?? 0) > MAX_BIO_LENGTH
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        `${description!.substring(0, MAX_BIO_LENGTH - 9)}…`
      : description;

  return (
    <LinkBox>
      <MetaTile>
        <Box
          bgImage={`url(${getPlayerBanner(player)})`}
          bgSize="cover"
          bgPosition="center"
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="4.5rem"
        />
        <NextLink as={getPlayerURL(player)} href="/player/[username]" passHref>
          <LinkOverlay>
            <MetaTileHeader>
              <VStack>
                <PlayerAvatar {...{ player }} size="xl" />
                <Heading size="lg" color="white" fontFamily="body">
                  {getPlayerName(player)}
                </Heading>
              </VStack>
              <Wrap w="100%" justify="center">
                {player.profile?.explorerTypeTitle && (
                  <WrapItem>
                    <MetaTag size="md" textTransform="uppercase">
                      {player.profile.explorerTypeTitle}
                    </MetaTag>
                  </WrapItem>
                )}
                {player.rank && (
                  <WrapItem>
                    <MetaTag
                      backgroundColor={player.rank.toLowerCase()}
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
                    {Math.floor(player.totalXP).toLocaleString()}
                  </MetaTag>
                </WrapItem>
                {showSeasonalXP && (
                  <WrapItem>
                    <MetaTag size="md">
                      SEASON {convertToRoman(getSeasonNum())} XP:{' '}
                      {Math.floor(player.seasonXP).toLocaleString()}
                    </MetaTag>
                  </WrapItem>
                )}
              </Wrap>
              {tz && (
                <Tooltip label={tz.name} hasArrow>
                  <HStack alignItems="baseline" w="auto" justify="center">
                    <FaGlobe color="blueLight" fontSize="0.875rem" />
                    <Text fontSize="lg">{tz.abbreviation}</Text>
                    {tz.utc && <Text fontSize="sm">{tz.utc}</Text>}
                  </HStack>
                </Tooltip>
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
          {player.skills?.length && (
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
          )}

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
