import { IconButton, MetaTileLinkWrapper, Wrap, WrapItem } from '@metafam/ds';
import { linkButtonProps } from 'components/Guild/Section/GuildLinks';
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
            <MetaTileLinkWrapper key={`${acc.identifier}_${acc.type}`}>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  if (link) window?.open(link, '_blank')?.focus();
                }}
                aria-label="Twitter"
                icon={<FaTwitter />}
                minW={6}
                w={6}
                h={6}
                borderRadius="full"
                {...linkButtonProps}
              />
            </MetaTileLinkWrapper>
          );
        }
        case 'GITHUB': {
          const link = `https://github.com/${acc.identifier}`;
          return (
            <MetaTileLinkWrapper key={`${acc.identifier}_${acc.type}`}>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  if (link) window?.open(link, '_blank')?.focus();
                }}
                aria-label="Github"
                icon={<FaGithub />}
                minW={6}
                w={6}
                h={6}
                borderRadius="full"
                {...linkButtonProps}
              />
            </MetaTileLinkWrapper>
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
