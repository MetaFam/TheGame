import { Button, HStack } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

import { PlayerBox } from './PlayerBoxe';

// TODO Maybe add more social platform
type Props = { player: PlayerFragmentFragment; setRemoveBox: () => void };
export const PlayerContactButtons: React.FC<Props> = ({
  player,
  setRemoveBox,
}) => {
  return (
    <PlayerBox title="Contact" setRemoveBox={setRemoveBox}>
      <HStack>
        {player.Accounts.map((acc) => {
          if (acc.type === 'TWITTER') {
            const link = `https://twitter.com/${acc.identifier}`;
            return (
              <Button
                as="a"
                href={link}
                target="_blank"
                key={link}
                size="xs"
                colorScheme="twitter"
                backgroundColor="platinum"
                borderRadius="50%"
                h={12}
                w={12}
                ml={0}
                mr={8}
              >
                <FaTwitter size={24} color="#392373" />
              </Button>
            );
          }
          if (acc.type === 'GITHUB') {
            const link = `https://github.com/${acc.identifier}`;
            return (
              <Button
                as="a"
                href={link}
                target="_blank"
                key={link}
                size="xs"
                colorScheme="blackAlpha"
                backgroundColor="platinum"
                borderRadius="50%"
                h={12}
                w={12}
                ml={0}
                mr={8}
              >
                <FaGithub size={24} color="#392373" />
              </Button>
            );
          }
          return null;
        })}
      </HStack>
    </PlayerBox>
  );
};
