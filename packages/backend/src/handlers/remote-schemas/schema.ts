import { makeExecutableSchema } from '@graphql-tools/schema';

import { getPSeedInfo } from './resolvers/balancerPolygon/resolver.js';
import { getBrightIdStatus } from './resolvers/brightId/resolver.js';
import { getDaoHausMemberships } from './resolvers/daohaus/resolver.js';
import {
  getDiscordServerMemberRoles,
  getGuildDiscordAnnouncements,
  getGuildDiscordRoles,
} from './resolvers/discord/resolver.js';
import {
  getTokenBalances,
  getTopPSeedHolders,
} from './resolvers/seedGraph/resolver.js';
import { typeDefs } from './typeDefs.js';
import { uuid } from './types/uuid.js';

const resolvers = {
  Query: {
    getDaoHausMemberships,
    getBrightIdStatus,
    getTokenBalances,
    getTopPSeedHolders,
    getGuildDiscordRoles,
    getDiscordServerMemberRoles,
    getGuildDiscordAnnouncements,
    getPSeedInfo,
  },
  uuid,
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
