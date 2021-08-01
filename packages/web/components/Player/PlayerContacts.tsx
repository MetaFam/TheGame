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
      {player.Accounts.map((acc) => {
        if (acc.type === 'TWITTER') {
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
                leftIcon={<FaTwitter />}
              >
                {acc.identifier}
              </Button>
            </WrapItem>
          );
        }
        if (acc.type === 'GITHUB') {
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
                leftIcon={<FaGithub />}
              >
                {acc.identifier}
              </Button>
            </WrapItem>
          );
        }
        return null;
      })}
      {player.ethereum_address ? (
        <WrapItem>
          <Tooltip
            label={copied ? 'Copied!' : 'Copy to clipboard'}
            closeOnClick={false}
            hasArrow
          >
            <Button
              onClick={(evt) => {
                evt.preventDefault();
                return player.ethereum_address
                  ? handleCopy(player.ethereum_address.toLowerCase())
                  : undefined;
              }}
              size="xs"
              colorScheme="blackAlpha"
              leftIcon={<FaEthereum />}
            >
              {formatAddress(player.ethereum_address)}
            </Button>
          </Tooltip>
        </WrapItem>
      ) : null}
      {verified && !disableBrightId ? (
        <WrapItem>
          <Tooltip label="Verified on BrightID" closeOnClick={false} hasArrow>
            <Button
              size="xs"
              colorScheme="brightIdOrange"
              leftIcon={<BrightIdIcon />}
            >
              Verified
            </Button>
          </Tooltip>
        </WrapItem>
      ) : null}
    </Wrap>
  );
};
