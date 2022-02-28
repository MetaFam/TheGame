import { Button, Tooltip, Wrap, WrapItem } from '@metafam/ds';
import { Player } from 'graphql/autogen/types';
import { useCopyToClipboard } from 'lib/hooks/useCopyToClipboard';
import React from 'react';
import { FaEthereum, FaGithub, FaTwitter } from 'react-icons/fa';
import { formatAddress } from 'utils/playerHelpers';

import { PlayerBrightId } from './Section/PlayerBrightId';

type Props = {
  player: Player;
  disableBrightId?: boolean;
};

export const PlayerContacts: React.FC<Props> = ({
  player,
  disableBrightId = true, // TODO: enable after fixing issue #1068
}) => {
  const [copied, handleCopy] = useCopyToClipboard();
  return (
    <Wrap justify="center">
      {player?.accounts?.map((acc) => {
        switch (acc.type) {
          case 'TWITTER': {
            const link = `https://twitter.com/${acc.identifier}`;
            return (
              <WrapItem key={link}>
                <Button
                  as="a"
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  size="xs"
                  colorScheme="twitter"
                  color="white"
                  leftIcon={<FaTwitter />}
                >
                  {acc.identifier}
                </Button>
              </WrapItem>
            );
          }
          case 'GITHUB': {
            const link = `https://github.com/${acc.identifier}`;
            return (
              <WrapItem key={link}>
                <Button
                  as="a"
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  size="xs"
                  colorScheme="blackAlpha"
                  backgroundColor="black"
                  color="white"
                  leftIcon={<FaGithub />}
                >
                  {acc.identifier}
                </Button>
              </WrapItem>
            );
          }
          default: {
            return null;
          }
        }
      })}
      {player?.ethereumAddress && (
        <WrapItem>
          <Tooltip
            label={copied ? 'Copied!' : 'Copy to clipboard'}
            closeOnClick={false}
            hasArrow
          >
            <Button
              onClick={(evt) => {
                evt.preventDefault();
                handleCopy(player.ethereumAddress);
              }}
              size="xs"
              colorScheme="blackAlpha"
              leftIcon={<FaEthereum />}
              color="white"
            >
              {formatAddress(player.ethereumAddress)}
            </Button>
          </Tooltip>
        </WrapItem>
      )}
      {!disableBrightId && (
        <WrapItem>
          <PlayerBrightId {...{ player }} />
        </WrapItem>
      )}
    </Wrap>
  );
};
