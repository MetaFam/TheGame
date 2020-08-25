import { H1, MetaBox, P } from '@metafam/ds';
import React from 'react';

import { getPlayerDescription, getPlayerName } from '../../utils/playerHelpers';

type Props = { player: PlayerFragmentFragment };

export const PlayerAboutMe: React.FC<Props> = ({ player }) => {
  return (
    <MetaBox title="About Me">
      <H1>{getPlayerName(player)}</H1>
      <P>{getPlayerDescription(player)}</P>
    </MetaBox>
  );
};
