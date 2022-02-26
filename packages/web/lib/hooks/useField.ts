import { httpLink, Maybe, Optional } from '@metafam/utils';
import { ExplorerType, Player, Profile } from 'graphql/autogen/types';
import { Atom, atom as newAtom, PrimitiveAtom, useAtom } from 'jotai';
import { useMemo } from 'react';

// eslint-disable-next-line import/no-cycle
import { useUser } from './useUser';

export type ProfileFieldType<T> = {
  [field in keyof Profile]?: Maybe<T>;
} & {
  value: Maybe<T>;
  setter: Maybe<(value: unknown) => void>;
  owner: Maybe<boolean>;
  fetching: boolean;
};

export type ProfileValueType = string | number | Array<string> | ExplorerType;

let fields: Record<string, Atom<Maybe<unknown>>> = {};
const nullAtom = newAtom(null, () => {
  throw new Error('Unimplemented');
});

export const clearJotaiState = () => {
  fields = {};
};

export const useProfileField = <T extends ProfileValueType = string>({
  field,
  player = null,
  getter = null,
}: {
  field: string;
  player?: Maybe<Player>;
  getter?: Maybe<(player: Maybe<Player>) => Optional<Maybe<T>>>;
}): ProfileFieldType<T> => {
  const { fetching, user } = useUser();
  const owner = user ? user.id === player?.id : null;
  const key = field as keyof Profile;
  const value = player?.profile?.[key] ?? null;
  let setter: Maybe<(val: unknown) => void> = null;
  let display = useMemo(() => (getter ? getter(player) : value) ?? null, [
    getter,
    player,
    value,
  ]);
  let atom = owner ? fields[field] : null;
  if (!atom && owner && player && value) {
    // eslint-disable-next-line no-multi-assign
    fields[field] = atom = newAtom<Maybe<T>>(value);
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const ret = useAtom((atom ?? nullAtom) as PrimitiveAtom<Maybe<typeof value>>);
  if (atom) {
    [display, setter] = ret;
  }

  if (field.endsWith('ImageURL')) {
    display = httpLink(display);
  }

  return {
    value: display,
    setter,
    [field]: display,
    owner,
    fetching,
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
