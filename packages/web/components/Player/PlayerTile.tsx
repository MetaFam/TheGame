import {
  Flex,
  Heading,
  HStack,
  Link,
  LoadingState,
  MetaTag,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@metafam/ds';
import type { Maybe } from '@metafam/utils';
import { PatronRank } from 'components/Patron/PatronRank';
import { PlayerContacts } from 'components/Player/PlayerContacts';
import { PlayerProfilePicture } from 'components/Player/PlayerProfilePicture';
import { SkillsTags } from 'components/Quest/Skills';
import type { Player, Skill } from 'graphql/autogen/types';
import { getAllMemberships, GuildMembership } from 'graphql/getMemberships';
import type { Patron } from 'graphql/types';
import React, { useCallback, useEffect, useState } from 'react';
import {
  getPlayerDescription,
  getPlayerName,
  getPlayerURL,
} from 'utils/playerHelpers';

import { PlayerRank } from './PlayerRank';
import { DAOMembershipSmall } from './Section/PlayerMemberships';

type Props = {
  player: Player;
  isPatron?: boolean;
  pSeedPrice?: Maybe<number>;
  showSeasonalXP?: boolean;
  index?: number;
};

export const PlayerTile: React.FC<Props> = ({
  player,
  isPatron = false,
  pSeedPrice,
  showSeasonalXP,
  index,
}) => {
  const description = getPlayerDescription(player);
  const [memberships, setMemberships] = useState<GuildMembership[]>([]);
  const [linkURL, setLinkURL] = useState<string>();
  const [loading, setLoading] = useState(true);
  const daosRef = React.useRef<HTMLDivElement>(null);
  const [playerName, setPlayerName] = useState<string>(player.ethereumAddress);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    getAllMemberships(player).then(({ all }) => {
      setLoading(false);
      setMemberships(all);
    });
  }, [player]);

  const handleResize = useCallback(() => {
    const width = daosRef.current?.scrollWidth;
    setLimit(Math.max(8, Math.floor((width ?? 22) / 22)));
  }, []);

  useEffect(() => {
    const elem = daosRef.current;
    elem?.addEventListener('resize', handleResize);
    return () => elem?.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    const getPlayer = async () => {
      const url = await getPlayerURL(player);
      const name = await getPlayerName(player);
      setLinkURL(url);
      setPlayerName(name);
    };
    getPlayer();
  }, [player]);

  return (
    <Link role="group" _hover={{ textDecoration: 'none' }} href={linkURL}>
      <MetaTile minW={'300px'} height="full" width="full" cursor="pointer">
        <MetaTileHeader>
          {isPatron && typeof index === 'number' && pSeedPrice ? (
            <PatronRank patron={player as Patron} {...{ pSeedPrice, index }} />
          ) : (
            <PlayerRank {...{ player, showSeasonalXP }} />
          )}
          <PlayerProfilePicture {...{ player }} size="xl" />
          <Flex px={3} w="full" pos="absolute" bottom={-6} zIndex={1}>
            <Heading
              size="lg"
              color="white"
              bgColor="whiteAlpha.100"
              backdropFilter="blur(10px)"
              lineHeight={1.8}
              justifyContent="center"
              px={3}
              width="full"
              textAlign="center"
              borderRadius={10}
              fontFamily="body"
              fontWeight={400}
              textShadow="0 0 8px var(--chakra-colors-blackAlpha-400)" // v. light shadow makes the text readable if the logo/avatar is white
            >
              {playerName}
            </Heading>
          </Flex>
        </MetaTileHeader>
        <MetaTileBody pos="relative" height="full">
          <Flex direction="column" gap={2} mb="auto">
            {description && (
              <VStack spacing={1} align="stretch">
                <Text textStyle="caption">About</Text>
                <Text fontSize="sm" noOfLines={4}>
                  {description}
                </Text>
              </VStack>
            )}
            {!!player.skills?.length && (
              <VStack spacing={2} align="stretch" mt={2}>
                <Text textStyle="caption">Skills</Text>
                <SkillsTags
                  skills={player.skills.map(({ Skill: s }) => s) as Skill[]}
                />
              </VStack>
            )}
          </Flex>

          <Flex justifyContent="space-between" pointerEvents="none">
            <VStack spacing={2} align="stretch" ref={daosRef}>
              {!!memberships.length && (
                <>
                  <Text textStyle="caption">Member of</Text>
                  <HStack mt={2} position="relative" zIndex={1}>
                    {loading ? (
                      <LoadingState mb={6} />
                    ) : (
                      <Wrap overflow="visible">
                        {memberships
                          .slice(
                            0,
                            memberships.length > limit ? limit - 1 : limit,
                          )
                          .map((membership) => (
                            <WrapItem key={membership.address ?? Math.random()}>
                              <DAOMembershipSmall {...{ membership }} />
                            </WrapItem>
                          ))}
                        {memberships.length > limit && (
                          <WrapItem>
                            <MetaTag size="sm" fontWeight="normal" h={8}>
                              {`+${memberships.length - limit + 1}`}
                            </MetaTag>
                          </WrapItem>
                        )}
                      </Wrap>
                    )}
                  </HStack>
                </>
              )}
            </VStack>

            {!!player.accounts?.length && (
              <VStack spacing={2}>
                <Text textStyle="caption">Contact</Text>
                <HStack mt={1} pointerEvents="all">
                  <PlayerContacts {...{ player }} disableBrightId />
                </HStack>
              </VStack>
            )}
          </Flex>
        </MetaTileBody>
      </MetaTile>
    </Link>
  );
};
