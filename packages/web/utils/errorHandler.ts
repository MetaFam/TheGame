import Honeybadger from '@honeybadger-io/js';
import { CombinedError } from 'urql';

export const errorHandler = (error: Error | CombinedError): void => {
  console.error(error);
  Honeybadger.notify(error);
};
