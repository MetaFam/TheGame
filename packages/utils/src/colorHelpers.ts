import { Maybe } from './extendedProfileTypes';

export const maskFor = (disposition?: Maybe<string>) => {
  if (disposition == null) return null;

  let mask = 0;
  if (/w/i.test(disposition)) mask += 0b10000;
  if (/u/i.test(disposition)) mask += 0b01000;
  if (/b/i.test(disposition)) mask += 0b00100;
  if (/r/i.test(disposition)) mask += 0b00010;
  if (/g/i.test(disposition)) mask += 0b00001;
  return mask;
};
