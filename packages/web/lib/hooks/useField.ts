import { httpLink, Maybe, Optional } from '@metafam/utils';
import { ExplorerType, Player, Profile } from 'graphql/autogen/types';
import { Atom, atom as newAtom, PrimitiveAtom, useAtom } from 'jotai';
import { useMemo } from 'react';

export type ProfileFieldType<T> = {
  [field in keyof Profile]?: Maybe<T>;
} & {
  value: Maybe<T>;
  setter: Maybe<(value: unknown) => void>;
};

export type ProfileValueType = string | number | Array<string> | ExplorerType;

const fields: Record<string, Atom<Maybe<unknown>>> = {};
const nullAtom = newAtom(null, () => {
  throw new Error('Unimplemented');
});

export const useProfileField = <T extends ProfileValueType = string>({
  field,
  player = null,
  owner = false,
  getter = null,
}: {
  field: string;
  player?: Maybe<Player>;
  owner?: boolean;
  getter?: Maybe<(player: Maybe<Player>) => Optional<Maybe<T>>>;
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
    fields[field] = atom = newAtom<Maybe<T>>(value);
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const ret = useAtom((atom ?? nullAtom) as PrimitiveAtom<Maybe<typeof value>>);
  if (atom) {
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

export const useOverridableField = <T = string>({
  field,
  defaultValue = null,
  loaded = true,
}: {
  field: string;
  defaultValue?: Maybe<T>;
  loaded?: boolean;
}) => {
  let value: Maybe<T> = defaultValue ?? null;
  let setter: Maybe<(val: unknown) => void> = null;
  let atom = fields[field] ?? null;
  if (!atom && (loaded || !!value)) {
    // eslint-disable-next-line no-multi-assign
    fields[field] = atom = newAtom<Maybe<T>>(value);
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const ret = useAtom((atom ?? nullAtom) as PrimitiveAtom<Maybe<T>>);
  if (atom) {
    value = ret[0] as Maybe<T>;
    setter = ret[1] as Maybe<(val: unknown) => void>;
  }

  return {
    value,
    setter,
    [field]: value,
  };
};
