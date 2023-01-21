import { errorHandler } from 'utils/errorHandler';

export class CeramicError extends Error {}

export const handleCeramicAuthenticationError = (err: Error) => {
  if (err.message === 'Unexpected token u in JSON at position 0') {
    throw new CeramicError('User canceled authentication.');
  }
  if (err.message === '"undefined" is not valid JSON') {
    throw new CeramicError('Could not authenticate with Ceramic API');
  }
  errorHandler(err);
  throw err;
};
