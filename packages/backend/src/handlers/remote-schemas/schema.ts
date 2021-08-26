import { makeExecutableSchema } from 'graphql-tools';

import { getBrightIdStatus } from './resolvers/brightId/resolver';
import { getDaoHausMemberships } from './resolvers/daohaus/resolver';
import {
  getDiscordServerMemberRoles,
  getGuildDiscordRoles,
} from './resolvers/discord/resolver';
import { getBoxProfile } from './resolvers/getBoxProfile/resolver';
import {
  getTokenBalances,
  getTopPSeedHolders,
} from './resolvers/seedGraph/resolver';
import { typeDefs } from './typeDefs';
import { uuid } from './types/uuid';

const resolvers = {
  Query: {
    getBoxProfile,
    getDaoHausMemberships,
    getBrightIdStatus,
    getTokenBalances,
    getTopPSeedHolders,
    getGuildDiscordRoles,
    getDiscordServerMemberRoles,
  },
  uuid,
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
