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
  VStack,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import { computeRank, Constants, Maybe } from '@metafam/utils';
import { PlayerAvatar } from 'components/Player/PlayerAvatar';
import { PlayerContacts } from 'components/Player/PlayerContacts';
import { PlayerTileMemberships } from 'components/Player/PlayerTileMemberships';
import { SkillsTags } from 'components/Quest/Skills';
import { utils } from 'ethers';
import { Player, Skill } from 'graphql/autogen/types';
import { Patron } from 'graphql/types';
import NextLink from 'next/link';
import React, { useMemo } from 'react';
import { FaGlobe } from 'react-icons/fa';
import { PATRON_RANKS, PATRONS_PER_RANK } from 'utils/patronHelpers';
import {
  getPlayerBanner,
  getPlayerDescription,
  getPlayerName,
  getPlayerURL,
} from 'utils/playerHelpers';

type Props = {
  patron: Patron;
  index: number;
  pSeedPrice: Maybe<number>;
};

const MAX_BIO_LENGTH = 240;

export const PatronTile: React.FC<Props> = ({ index, patron, pSeedPrice }) => {
  const player = patron as Player;

  const patronRank = useMemo(
    () => computeRank(index, PATRONS_PER_RANK, PATRON_RANKS),
    [index],
  );

  const { label: timeZone = null } = useMemo(
    () =>
      getTimeZoneFor({ location: player.profile?.timeZone ?? undefined }) ?? {
        label: null,
        offset: null,
      },
    [player.profile?.timeZone],
  );

  const displayDescription = useMemo(() => {
    const description = getPlayerDescription(player);
    return description && description.length > MAX_BIO_LENGTH
      ? `${description.substring(0, MAX_BIO_LENGTH - 9)}…`
      : description;
  }, [player]);

  const displayBalance = useMemo(() => {
    const pSeedAmount = parseFloat(
      utils.formatUnits(patron.pSeedBalance, Constants.PSEED_DECIMALS),
    );
    const pSeedBalance = `${Math.floor(pSeedAmount).toLocaleString()} pSEED`;
    return pSeedPrice == null
      ? pSeedBalance
      : `$${(pSeedAmount * pSeedPrice).toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}`;
  }, [patron, pSeedPrice]);

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
                <PlayerAvatar player={player} size="xl" />
                <Heading size="xs" color="white">
                  {getPlayerName(player)}
                </Heading>
              </VStack>
              <Wrap w="100%" justify="center">
                {patron.pSeedBalance != null && (
                  <WrapItem>
                    <MetaTag size="md">{displayBalance}</MetaTag>
                  </WrapItem>
                )}
                {patronRank && (
                  <WrapItem>
                    <MetaTag
                      backgroundColor={patronRank?.toLowerCase()}
                      size="md"
                      color="blackAlpha.600"
                    >
                      {patronRank}
                    </MetaTag>
                  </WrapItem>
                )}
                <WrapItem>
                  <MetaTag size="md">{`XP: ${Math.floor(
                    player.totalXP,
                  ).toLocaleString()}`}</MetaTag>
                </WrapItem>
              </Wrap>
              {timeZone && (
                <HStack alignItems="center" w="auto" justify="center">
                  <FaGlobe color="blueLight" fontSize="0.875rem" />
                  <Text fontSize="sm">{timeZone || '―'}</Text>
                </HStack>
              )}
              {displayDescription && (
                <VStack spacing={2} align="stretch" pt="0.5rem">
                  <Text textStyle="caption">About</Text>
                  <Text fontSize="sm">{displayDescription}</Text>
                </VStack>
              )}
            </MetaTileHeader>
          </LinkOverlay>
        </NextLink>
        <MetaTileBody>
          {player.skills?.length && (
            <VStack spacing={2} align="stretch">
              <Text textStyle="caption">SKILLS</Text>
              <SkillsTags
                skills={player.skills.map((s) => s.Skill) as Skill[]}
              />
            </VStack>
          )}

          <PlayerTileMemberships player={player} />

          {player.accounts?.length && (
            <VStack spacing={2} align="stretch">
              <Text textStyle="caption">CONTACT</Text>
              <HStack mt="2">
                <PlayerContacts player={player} />
              </HStack>
            </VStack>
          )}
        </MetaTileBody>
      </MetaTile>
    </LinkBox>
  );
};
