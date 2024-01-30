import { SimpleGrid } from '@metafam/ds';
import { GuildTile } from 'components/Guild/GuildTile';
import { GuildFragment } from 'graphql/autogen/types';


type Props = {
  guilds: GuildFragment[];
};

export const GuildList: React.FC<Props> = ({ guilds }) => (
  <SimpleGrid
    columns={[1, null, 2, 3]}
    spacing="6"
    autoRows="minmax(25rem, auto)"
  >
    {guilds.map((p) => (
      <GuildTile key={p.id} guild={p} />
    ))}
  </SimpleGrid>
);
