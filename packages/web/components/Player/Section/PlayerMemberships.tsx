import { Box, Flex, HStack, Text } from '@metafam/ds';
import ethereumImage from 'assets/moloch/ethereum.png';
import hausdaoImage from 'assets/moloch/hausdao.png';
import metacartelImage from 'assets/moloch/metacartel.png';
import metaclanImage from 'assets/moloch/metaclan.png';
import metagameImage from 'assets/moloch/metagame.png';
import raidGuildImage from 'assets/moloch/raid_guild.png';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

import { ProfileSection } from '../../ProfileSection';

type Props = { player: PlayerFragmentFragment; onRemoveClick: () => void };
export const PlayerMemberships: React.FC<Props> = ({
  player,
  onRemoveClick,
}) => {
  const [show, setShow] = React.useState(false);

  // TODO Probably a better way to do that or should be completed, API/IPFS ?
  const getImageMoloch = (title: string) => {
    if (/hausdao/i.test(title)) return hausdaoImage;
    if (/metacartel/i.test(title)) return metacartelImage;
    if (/metaclan/i.test(title)) return metaclanImage;
    if (/raid guild/i.test(title)) return raidGuildImage;
    return ethereumImage;
  };

  return (
    <ProfileSection title="Memberships" onRemoveClick={onRemoveClick}>
      <HStack alignItems="center" mb={6}>
        <Flex bg="purpleBoxLight" width={16} height={16} mr={6}>
          <Box
            bgImage={`url(${metagameImage})`}
            backgroundSize="cover"
            width={12}
            height={12}
            m="auto"
          />
        </Flex>
        <Box>
          <Text fontSize="md" mb="1">
            MetaGame
          </Text>
          <HStack alignItems="center">
            <Text fontSize="xs" casing="capitalize" mr={3}>
              {
                // TODO Im not 100% sure this should be player.rank ?
              }
              {(player.rank || '').toLowerCase()}
            </Text>
            <Text fontSize="xs">XP: {Math.round(player.total_xp || 0)}</Text>
          </HStack>
        </Box>
      </HStack>
      {
        // TODO Fake data => Should be retrieved from DAO
        (player.daohausMemberships || [])
          .slice(0, show ? 999 : 3)
          .map((member) => (
            <HStack alignItems="center" mb={6} key={member.id}>
              <Flex bg="purpleBoxLight" width={16} height={16} mr={6}>
                <Box
                  bgImage={
                    `url(${getImageMoloch(member.moloch.title ?? '')})`
                  }
                  backgroundSize="cover"
                  width={12}
                  height={12}
                  m="auto"
                />
              </Flex>
              <Box>
                <Text fontSize="md" mb="1">
                  {member.moloch.title}
                </Text>
                <HStack alignItems="center">
                  <Text fontSize="xs" casing="capitalize" mr={3}>
                    player
                  </Text>
                  <Text fontSize="xs">
                    Shares: {member.shares}/{member.moloch.totalShares}
                  </Text>
                </HStack>
              </Box>
            </HStack>
          ))
      }
      {(player.daohausMemberships || []).length > 3 && (
        <Text
          as="span"
          fontFamily="body"
          fontSize="xs"
          color="cyanText"
          cursor="pointer"
          onClick={() => setShow(!show)}
        >
          View {show ? 'less' : 'all'}
        </Text>
      )}
    </ProfileSection>
  );
};
