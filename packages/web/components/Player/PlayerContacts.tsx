import { Flex, Icon, Tooltip, Wrap, WrapItem } from '@metafam/ds';
import { Player } from 'graphql/autogen/types';
import React from 'react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

import { PlayerBrightId } from './Section/PlayerBrightId';

type Props = {
  player: Player;
  disableBrightId?: boolean;
};

export const PlayerContacts: React.FC<Props> = ({
  player,
  disableBrightId = true, // TODO: enable after fixing issue #1068
}) => (
  <Wrap justify="center">
    {player?.accounts?.map((acc) => {
      switch (acc.type) {
        case 'TWITTER': {
          const link = `https://twitter.com/${acc.identifier}`;
          return (
            <Tooltip key={link} label={acc.identifier}>
              <Flex
                bg="purpleBoxLight"
                w={8}
                h={8}
                borderRadius={8}
                alignItems="center"
                justifyContent="center"
                onClick={(e) => {
                  e.preventDefault();
                  window?.open(link, '_blank')?.focus();
                }}
              >
                <Icon as={FaTwitter} w={4} h={4} m={0} />
              </Flex>
            </Tooltip>
          );
        }
        case 'GITHUB': {
          const link = `https://github.com/${acc.identifier}`;
          return (
            <Tooltip key={link} label={acc.identifier}>
              <Flex
                bg="purpleBoxLight"
                w={8}
                h={8}
                p={0}
                borderRadius={8}
                alignItems="center"
                justifyContent="center"
                onClick={(e) => {
                  e.preventDefault();
                  window?.open(link, '_blank')?.focus();
                }}
              >
                <Icon as={FaGithub} w={4} h={4} m={0} />
              </Flex>
            </Tooltip>
          );
        }
        default: {
          return null;
        }
      }
    })}
    {!disableBrightId && (
      <WrapItem>
        <PlayerBrightId {...{ player }} />
      </WrapItem>
    )}
  </Wrap>
);
