import { Maybe } from '@metafam/utils';
import { Player, Profile } from 'graphql/autogen/types';
import { Atom, atom as newAtom, useAtom } from 'jotai';
import { useState } from 'react';

export const get = (key: string): string | null =>
  typeof window === 'undefined' ? null : localStorage.getItem(key);

export const set = (key: string, value: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, value);
};

export const remove = (key: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
};

export const useProfileField = ({
  field,
  player,
  owner = false,
}: {
  field: string;
  player: Player;
  owner: boolean;
}) => {
  const [fields, setFields] = useState<Record<string, Atom<Maybe<string>>>>({});
  const data = player?.profile?.[field as keyof Profile] ?? null;
  let atom = fields[field];
  if (!atom && owner) {
    atom = newAtom<Maybe<string>>(data);
    setFields((f) => ({
      ...f,
      field: atom,
    }));
  }
  const [value, setter] = useAtom(atom);
  return owner ? { value, setter } : { value: data, setter: null };
};
