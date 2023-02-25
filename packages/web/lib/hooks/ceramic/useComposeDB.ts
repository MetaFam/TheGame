import {
  ComposeDBContext,
  ComposeDBContextType,
} from 'contexts/ComposeDBContext';
import { useContext } from 'react';

export const useComposeDB = (): ComposeDBContextType =>
  useContext(ComposeDBContext);
