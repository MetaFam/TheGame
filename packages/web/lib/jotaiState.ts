import { Maybe } from '@metafam/utils';
import { Atom } from 'jotai';

class JotaiState {
  fields: Record<string, Atom<Maybe<unknown>>>;

  constructor() {
    this.fields = {};
  }

  getField(field: string): Atom<Maybe<unknown>> {
    return this.fields[field];
  }

  setField(field: string, atom: Atom<Maybe<unknown>>): void {
    this.fields[field] = atom;
  }

  clear() {
    this.fields = {};
  }
}

const jotaiState = new JotaiState();

export const clearJotaiState = () => jotaiState.clear();

export const getJotaiState = (field: string): Atom<Maybe<unknown>> =>
  jotaiState.getField(field);

export const setJotaiState = (
  field: string,
  atom: Atom<Maybe<unknown>>,
): void => jotaiState.setField(field, atom);
