import addAddressHandler from './addAddress';
import helpHandler from './help';
import signupHandler from './signup';

export const handlers = new Map([
  ['addaddress', addAddressHandler],
  ['help', helpHandler],
  ['signup', signupHandler],
]);
