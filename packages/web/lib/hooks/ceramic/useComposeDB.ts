import { useContext } from 'react';

import {
  ComposeDBContext,
  ComposeDBContextType,
} from '#contexts/ComposeDBContext';

export const useComposeDB = (): ComposeDBContextType =>
  useContext(ComposeDBContext);
