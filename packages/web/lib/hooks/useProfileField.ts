import { httpLink, Maybe } from '@metafam/utils';
import { Player, Profile } from 'graphql/autogen/types';
import { Atom, atom as newAtom, PrimitiveAtom, useAtom } from 'jotai';
import { useMemo } from 'react';

export type ProfileFieldType<T> = {
  [field in keyof Profile]?: Maybe<T>;
} & {
  value: Maybe<T>;
  setter: Maybe<(value: unknown) => void>;
};

const fields: Record<string, Atom<Maybe<string | number>>> = {};
const nullAtom = newAtom(null, () => {
  throw new Error('Unimplemented');
});

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
  const key = field as keyof Profile;
  let setter: Maybe<(val: unknown) => void> = null;
  let value = useMemo(
    () => (getter ? getter(player) : player?.profile?.[key]) ?? null,
    [key, getter, player],
  );
  let atom = owner ? fields[field] : null;
  if (!atom && owner && player) {
    // eslint-disable-next-line no-multi-assign
    fields[field] = atom = newAtom<Maybe<typeof value>>(value);
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const ret = useAtom((atom ?? nullAtom) as PrimitiveAtom<Maybe<typeof value>>);
  if (owner && ret) {
    [value, setter] = ret;
  }

  if (field.endsWith('ImageURL')) {
    value = httpLink(value);
  }

  return {
    value,
    setter,
    [field]: value,
  };
};
