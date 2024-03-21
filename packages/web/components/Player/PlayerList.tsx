import { SimpleGrid } from '@metafam/ds';
import { PlayerTile } from 'components/Player/PlayerTile';
import { Player } from 'graphql/autogen/types';

type Props = {
  players: Player[];
  showSeasonalXP?: boolean;
};

export const PlayerList: React.FC<Props> = ({
  players,
  showSeasonalXP = false,
}) => (
  <SimpleGrid
    columns={[1, null, 2, 3]}
    spacing={8}
    autoRows="minmax(35rem, auto)"
    w="full"
    maxW="7xl"
    mx="auto"
  >
    {players.map((player, idx) => (
      <PlayerTile
        key={player.profile?.username ?? idx}
        {...{ player, showSeasonalXP }}
      />
    ))}
  </SimpleGrid>
);
