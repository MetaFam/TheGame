import { SimpleGrid } from '@metafam/ds';
import { PatronTile } from 'components/Patron/PatronTile';
import { PlayerFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

type Props = {
  patrons: PlayerFragmentFragment[];
};

export const PatronList: React.FC<Props> = ({ patrons }) => (
  <SimpleGrid columns={[1, null, 2, 3]} spacing="8" autoRows="minmax(35rem, auto)">
    {patrons.map((p) => (
      <PatronTile key={p.id} player={p} />
    ))}
  </SimpleGrid>
);
