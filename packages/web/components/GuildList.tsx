import { SimpleGrid } from '@metafam/ds';
import { GuildTile } from 'components/Guild/GuildTile';
import { GuildFragmentFragment } from 'graphql/autogen/types';
import React from 'react';

type Props = {
  guilds: GuildFragmentFragment[];
};

export const GuildList: React.FC<Props> = ({ guilds }) => (
  <SimpleGrid
    columns={[1, null, 2, 3]}
    spacing="8"
    autoRows="minmax(35rem, auto)"
  >
    {guilds.map((p) => (
      <GuildTile key={p.id} guild={p} />
    ))}
  </SimpleGrid>
);
