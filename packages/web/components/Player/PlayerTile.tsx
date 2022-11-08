import {
  Flex,
  Heading,
  HStack,
  Link,
  LinkBox,
  LoadingState,
  MetaTag,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Text,
  VStack,
  WrapItem,
} from '@metafam/ds';
import { PlayerContacts } from 'components/Player/PlayerContacts';
import { PlayerProfilePicture } from 'components/Player/PlayerProfilePicture';
import { PlayerTileMemberships } from 'components/Player/PlayerTileMemberships';
import { SkillsTags } from 'components/Quest/Skills';
import { Player, Skill } from 'graphql/autogen/types';
import { getAllMemberships, GuildMembership } from 'graphql/getMemberships';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  getPlayerDescription,
  getPlayerName,
  getPlayerURL,
} from 'utils/playerHelpers';

import { DAOMembershipSmall } from './Section/PlayerMemberships';

type Props = {
  player: Player;
  showSeasonalXP?: boolean;
};

const MAX_BIO_LENGTH = 240;

export const PlayerTile: React.FC<Props> = ({ player }) => {
  const description = getPlayerDescription(player);
  const displayDescription =
    (description?.length ?? 0) > MAX_BIO_LENGTH
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        `${description!.substring(0, MAX_BIO_LENGTH - 9)}…`
      : description;

  const [memberships, setMemberships] = useState<GuildMembership[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllMemberships(player).then((all) => {
      setLoading(false);
      setMemberships(all);
    });
  }, [player]);

  return (
    <LinkBox height="full" width="full">
      <MetaTile height="full" width="full">
        <NextLink as={getPlayerURL(player)} href="/player/[username]" passHref>
          <Link
            display="flex"
            flexDirection="column"
            height="100%"
            _hover={{
              textUnderline: 'none',
            }}
          >
            <MetaTileHeader>
              <VStack pos="relative">
                <Flex
                  flexDir="column"
                  gap={1}
                  pos="absolute"
                  left={-8}
                  p={3}
                  top={-8}
                  background="rgba(255, 255, 255, 0.1)"
                  backdropFilter="blur(10.5px)"
                  borderRadius="8px"
                >
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
                  <Text fontSize="sm" color="blueLight">
                    XP: {Math.floor(player.totalXP).toLocaleString()}
                  </Text>
                </Flex>
                <PlayerProfilePicture {...{ player }} size="xl" />
                <Flex px={3} w="full" pos="absolute" bottom={-6} zIndex={1}>
                  <Heading
                    size="lg"
                    color="white"
                    bgColor="rgba(255, 255, 255, 0.06)"
                    style={{ backdropFilter: 'blur(10px)' }}
                    lineHeight={1.8}
                    justifyContent="center"
                    px={3}
                    width="full"
                    textAlign="center"
                    borderRadius={10}
                    fontFamily="body"
                    fontWeight={400}
                  >
                    {getPlayerName(player)}
                  </Heading>
                </Flex>
              </VStack>
            </MetaTileHeader>
            <MetaTileBody pos="relative" height="full">
              {displayDescription && (
                <VStack spacing={2} align="stretch">
                  <Text textStyle="caption">ABOUT</Text>
                  <Text fontSize="sm">{displayDescription}</Text>
                </VStack>
              )}
              {player.skills?.length && (
                <VStack spacing={2} align="stretch">
                  <Text textStyle="caption">SKILLS</Text>
                  <SkillsTags
                    skills={
                      player.skills.map(({ Skill: skill }) => skill) as Skill[]
                    }
                  />
                </VStack>
              )}

              <PlayerTileMemberships {...{ player }} />

              <Flex justifyContent="space-between" pointerEvents="none">
                {!!memberships.length && (
                  <VStack spacing={2} align="stretch">
                    <Text textStyle="caption">MEMBER OF</Text>
                    <HStack mt={2} position="relative" zIndex={1}>
                      {loading && <LoadingState mb={6} />}
                      {!loading &&
                        memberships
                          .slice(0, 3)
                          .map((membership) => (
                            <DAOMembershipSmall
                              {...{ membership }}
                              key={membership.address}
                            />
                          ))}
                    </HStack>
                  </VStack>
                )}

                {!!player.accounts?.length && (
                  <VStack spacing={2} align="stretch">
                    <Text textStyle="caption">CONTACT</Text>
                    <HStack mt={2} pointerEvents="all">
                      <PlayerContacts {...{ player }} disableBrightId />
                    </HStack>
                  </VStack>
                )}
              </Flex>
            </MetaTileBody>
          </Link>
        </NextLink>
      </MetaTile>
    </LinkBox>
  );
};
