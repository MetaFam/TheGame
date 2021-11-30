import { BrightIdIcon, Button, Tooltip, Wrap, WrapItem } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import { useBrightIdStatus } from 'lib/hooks/brightId';
import { useCopyToClipboard } from 'lib/hooks/useCopyToClipboard';
import React from 'react';
import { FaEthereum, FaGithub, FaTwitter } from 'react-icons/fa';
import { formatAddress } from 'utils/playerHelpers';

type Props = {
  player: PlayerFragmentFragment;
  disableBrightId?: boolean;
};

export const PlayerContacts: React.FC<Props> = ({
  player,
  disableBrightId = false,
}) => {
  const { verified } = useBrightIdStatus({ player });
  const [copied, handleCopy] = useCopyToClipboard();
  return (
    <Wrap>
      {player.accounts?.map((acc) => {
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
      {player.ethereumAddress && (
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
      {verified && !disableBrightId && (
        <WrapItem>
          <Tooltip label="Verified on BrightID" closeOnClick={false} hasArrow>
            <Button
              size="xs"
              colorScheme="brightIdOrange"
              leftIcon={<BrightIdIcon />}
              color="white"
            >
              Verified
            </Button>
          </Tooltip>
        </WrapItem>
      )}
    </Wrap>
  );
};
