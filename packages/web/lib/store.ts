import { httpLink, Maybe } from '@metafam/utils';
import { Player, Profile } from 'graphql/autogen/types';
import { Atom, atom as newAtom, PrimitiveAtom, useAtom } from 'jotai';
import { useMemo } from 'react';

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

export type ProfileFieldType<T> = {
  [field in keyof Profile]?: Maybe<T>;
} & {
  value: Maybe<T>;
  setter: Maybe<(value: unknown) => void>;
};

const fields: Record<string, Atom<Maybe<string | number>>> = {};

export const useProfileField = <T = string>({
  field,
  player = null,
  owner = false,
  getter = null,
}: {
  field: string;
  player?: Maybe<Player>;
  owner?: boolean;
  getter?: Maybe<(player: Maybe<Player>) => T>;
}): ProfileFieldType<T> => {
  const defaultAtom = useMemo(() => newAtom(null), []);
  const key = field as keyof Profile;
  let setter = null;
  let value = useMemo(
    () => (getter ? getter(player) : player?.profile?.[key]) ?? null,
    [key, getter, player],
  );
  let atom = owner ? fields[field] : null;
  if (!atom && owner && player) {
    atom = newAtom<Maybe<typeof value>>(value);
    fields[field] = atom;
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const ret = useAtom(
    (atom ?? defaultAtom) as PrimitiveAtom<Maybe<typeof value>>,
  );
  if (owner) {
    [value, setter] = ret;
  }

  if (field.endsWith('ImageURL')) {
    value = httpLink(value);
  }

  return { value, setter, [field]: value };
};
