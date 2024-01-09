import { SimpleGrid } from '@metafam/ds';
import { GuildTile } from 'components/Guild/GuildTile';
import { GuildFragment } from 'graphql/autogen/types';
import React from 'react';

type Props = {
  guilds: GuildFragment[];
};

export const GuildList: React.FC<Props> = ({ guilds }) => (
  <SimpleGrid
    columns={[1, null, 2, 3]}
    spacing="6"
    autoRows="minmax(25rem, auto)"
    w="80vw"
  >
    {guilds.map((p) => (
      <GuildTile key={p.id} guild={p} />
    ))}
  </SimpleGrid>
);
