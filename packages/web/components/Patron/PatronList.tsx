import { SimpleGrid } from '@metafam/ds';
import { Maybe } from '@metafam/utils';
import { PlayerTile } from 'components/Player/PlayerTile';
import { Player } from 'graphql/autogen/types';
import { Patron } from 'graphql/types';

type Props = {
  patrons: Array<Patron>;
  pSeedPrice: Maybe<number>;
};

export const PatronList: React.FC<Props> = ({ patrons, pSeedPrice }) => (
  <SimpleGrid
    columns={[1, null, 2, 3]}
    spacing={8}
    autoRows="minmax(35rem, auto)"
  >
    {patrons.map((player: Player, index) => (
      <PlayerTile key={index} {...{ player, pSeedPrice, index }} isPatron />
    ))}
  </SimpleGrid>
);
