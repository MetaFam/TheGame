import { createApolloClient } from './client';
import { login, logout } from './auth';
import * as localQueries from './localQueries';

export {
  localQueries, createApolloClient, login, logout,
};
