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
import type { Maybe } from '@metafam/utils';
import { PatronRank } from 'components/Patron/PatronRank';
import { PlayerContacts } from 'components/Player/PlayerContacts';
import { PlayerProfilePicture } from 'components/Player/PlayerProfilePicture';
import { PlayerTileMemberships } from 'components/Player/PlayerTileMemberships';
import { SkillsTags } from 'components/Quest/Skills';
import type { Player, Skill } from 'graphql/autogen/types';
import { getAllMemberships, GuildMembership } from 'graphql/getMemberships';
<<<<<<< HEAD
import type { Patron } from 'graphql/types';
=======
import { Patron } from 'graphql/types';
>>>>>>> 86629af0 (make all card images square & clickable)
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
  const displayDescription = (
    (
      typeof description === 'string'
      && description.length > MAX_BIO_LENGTH
    ) ? (
      `${description!.substring(0, MAX_BIO_LENGTH - 9)}…`
    ) : (
      description
    )
  );

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
<<<<<<< HEAD
              {...{ pSeedPrice, index }}
            />
          ) : (
            <PlayerRank {...{ player, showSeasonalXP }} />
=======
              pSeedPrice={pSeedPrice}
              index={index}
            />
          ) : (
            <PlayerRank player={player} showSeasonalXP={showSeasonalXP} />
>>>>>>> 86629af0 (make all card images square & clickable)
          )}
          <PlayerProfilePicture {...{ player }} size="xl" />
          <Flex px={3} w="full" pos="absolute" bottom={-6} zIndex={1}>
            <Heading
              size="lg"
              color="white"
<<<<<<< HEAD
              bgColor="whiteAlpha.100"
              sx={{ backdropFilter: 'blur(10px)' }}
=======
              bgColor="rgba(255, 255, 255, 0.06)"
              style={{ backdropFilter: 'blur(10px)' }}
>>>>>>> 86629af0 (make all card images square & clickable)
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
<<<<<<< HEAD
                <Text textStyle="caption">About</Text>
=======
                <Text textStyle="caption">ABOUT</Text>
>>>>>>> 86629af0 (make all card images square & clickable)
                <Text fontSize="sm">{displayDescription}</Text>
              </VStack>
            )}
            {!!player.skills?.length && (
              <VStack spacing={2} align="stretch">
<<<<<<< HEAD
                <Text textStyle="caption">Skills</Text>
                <SkillsTags
                  skills={
                    player.skills.map(({ Skill: s }) => s) as Skill[]
=======
                <Text textStyle="caption">SKILLS</Text>
                <SkillsTags
                  skills={
                    player.skills.map(({ Skill: skill }) => skill) as Skill[]
>>>>>>> 86629af0 (make all card images square & clickable)
                  }
                />
              </VStack>
            )}

            <PlayerTileMemberships {...{ player }} />
          </Flex>

          <Flex justifyContent="space-between" pointerEvents="none">
            {!!memberships.length && (
              <VStack spacing={2} align="stretch">
<<<<<<< HEAD
                <Text textStyle="caption">Member of</Text>
                <HStack mt={2} position="relative" zIndex={1}>
                  {loading ? (
                    <LoadingState mb={6} />
                  ) : (
                    memberships
                    .slice(0, 3)
                    .map((membership) => (
                      <DAOMembershipSmall
                        {...{ membership }}
                        key={membership.address}
                      />
                    ))
                  )}
=======
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
>>>>>>> 86629af0 (make all card images square & clickable)
                </HStack>
              </VStack>
            )}

            {!!player.accounts?.length && (
              <VStack spacing={2} align="stretch">
<<<<<<< HEAD
                <Text textStyle="caption">Contact</Text>
=======
                <Text textStyle="caption">CONTACT</Text>
>>>>>>> 86629af0 (make all card images square & clickable)
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
