import { makeExecutableSchema } from '@graphql-tools/schema';

import { getBrightIdStatus } from './resolvers/brightId/resolver';
import { getDaoHausMemberships } from './resolvers/daohaus/resolver';
import {
  getDiscordServerMemberRoles,
  getGuildDiscordAnnouncements,
  getGuildDiscordRoles,
} from './resolvers/discord/resolver';
import {
  getTokenBalances,
  getTopPSeedHolders,
} from './resolvers/seedGraph/resolver';
import { typeDefs } from './typeDefs';
import { uuid } from './types/uuid';

const resolvers = {
  Query: {
    getDaoHausMemberships,
    getBrightIdStatus,
    getTokenBalances,
    getTopPSeedHolders,
    getGuildDiscordRoles,
    getDiscordServerMemberRoles,
    getGuildDiscordAnnouncements,
  },
  uuid,
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
