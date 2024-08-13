import { Maybe } from './extendedProfileTypes.js';

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

export const dispositionFor = (mask?: Maybe<number>) => {
  if (mask == null) return null;

  let disposition = '';
  if ((mask & 0b10000) > 0) disposition += 'W';
  if ((mask & 0b01000) > 0) disposition += 'U';
  if ((mask & 0b00100) > 0) disposition += 'B';
  if ((mask & 0b00010) > 0) disposition += 'R';
  if ((mask & 0b00001) > 0) disposition += 'G';
  return disposition;
};
