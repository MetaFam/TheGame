import { Flex, Icon, Link, Tooltip, Wrap, WrapItem } from '@metafam/ds';
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
  <Wrap justify="center" pointerEvents="all" zIndex={1000}>
    {player?.accounts?.map((acc) => {
      switch (acc.type) {
        case 'TWITTER': {
          const link = `https://twitter.com/${acc.identifier}`;
          return (
            <Tooltip key={link} label={acc.identifier}>
              <Link href={link} isExternal>
                <Flex
                  align="center"
                  justifyContent="center"
                  bgColor="rgba(255, 255, 255, 0.06)"
                  minW={8}
                  h={8}
                  borderRadius={8}
                  onClick={(e) => {
                    e.preventDefault();
                    if (link) window?.open(link, '_blank')?.focus();
                  }}
                >
                  <Icon as={FaTwitter} w={4} h={4} m={0} />
                </Flex>
              </Link>
            </Tooltip>
          );
        }
        case 'GITHUB': {
          const link = `https://github.com/${acc.identifier}`;
          return (
            <Tooltip key={link} label={acc.identifier}>
              <Link href={link} isExternal>
                <Flex
                  align="center"
                  justifyContent="center"
                  bgColor="rgba(255, 255, 255, 0.06)"
                  minW={8}
                  h={8}
                  borderRadius={8}
                  onClick={(e) => {
                    e.preventDefault();
                    if (link) window?.open(link, '_blank')?.focus();
                  }}
                >
                  <Icon as={FaGithub} w={4} h={4} m={0} />
                </Flex>
              </Link>
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
