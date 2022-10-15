import { SimpleGrid } from '@metafam/ds';
import { PatronTile } from 'components/Patron/PatronTile';
import { Patron } from 'graphql/types';
import React from 'react';

type Props = {
  patrons: Array<Patron>;
  pSeedPrice: number;
};

export const PatronList: React.FC<Props> = ({ patrons, pSeedPrice }) => (
  <SimpleGrid
    columns={[1, null, 2, 3]}
    spacing="8"
    autoRows="minmax(35rem, auto)"
  >
    {patrons.map((p, i) => (
      <PatronTile key={p.id} patron={p} index={i} pSeedPrice={pSeedPrice} />
    ))}
  </SimpleGrid>
);
