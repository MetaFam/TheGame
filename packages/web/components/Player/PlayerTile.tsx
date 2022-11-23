import {
  Flex,
  Heading,
  HStack,
  Link,
  LoadingState,
  MetaTile,
  MetaTileBody,
  MetaTileHeader,
  Text,
  VStack,
} from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import { PatronRank } from 'components/Patron/PatronRank';
import { PlayerContacts } from 'components/Player/PlayerContacts';
import { PlayerProfilePicture } from 'components/Player/PlayerProfilePicture';
import { PlayerTileMemberships } from 'components/Player/PlayerTileMemberships';
import { SkillsTags } from 'components/Quest/Skills';
import { Player, Skill } from 'graphql/autogen/types';
import { getAllMemberships, GuildMembership } from 'graphql/getMemberships';
import { Patron } from 'graphql/types';
import React, { useEffect, useState } from 'react';
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

const MAX_BIO_LENGTH = 240;

export const PlayerTile: React.FC<Props> = ({
  player,
  isPatron = false,
  pSeedPrice,
  showSeasonalXP,
  index,
}) => {
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
    <Link
      role="group"
      _hover={{ textDecoration: 'none' }}
      href={getPlayerURL(player)}
    >
      <MetaTile height="full" width="full" cursor="pointer">
        <MetaTileHeader>
          {isPatron && typeof index === 'number' && pSeedPrice ? (
            <PatronRank
              patron={player as Patron}
              pSeedPrice={pSeedPrice}
              index={index}
            />
          ) : (
            <PlayerRank player={player} showSeasonalXP={showSeasonalXP} />
          )}
          <PlayerProfilePicture {...{ player }} size="xl" />
          <Flex px={3} w="full" pos="absolute" bottom={-6} zIndex={1}>
            <Heading
              size="lg"
              color="white"
              bgColor="landingGlassDark"
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
        </MetaTileHeader>
        <MetaTileBody pos="relative" height="full">
          <Flex flexDir="column" mb="auto">
            {displayDescription && (
              <VStack spacing={2} align="stretch">
                <Text textStyle="caption">ABOUT</Text>
                <Text fontSize="sm">{displayDescription}</Text>
              </VStack>
            )}
            {!!player.skills?.length && (
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
          </Flex>

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
      </MetaTile>
    </Link>
  );
};
