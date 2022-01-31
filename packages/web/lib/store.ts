import { Maybe } from '@metafam/utils';
import { Atom, atom, useAtom } from 'jotai';
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

export const profileImageURLAtom = atom<Maybe<string>>(null);
export const bannerImageURLAtom = atom<Maybe<string>>(null);
export const backgroundImageURLAtom = atom<Maybe<string>>(null);
export const nameAtom = atom<Maybe<string>>(null);
export const usernameAtom = atom<Maybe<string>>(null);
export const descriptionAtom = atom<Maybe<string>>(null);
export const emojiAtom = atom<Maybe<string>>(null);
export const locationAtom = atom<Maybe<string>>(null);
export const websiteAtom = atom<Maybe<string>>(null);
export const pronounsAtom = atom<Maybe<string>>(null);
export const availableHoursAtom = atom<Maybe<string>>(null);
export const timeZoneAtom = atom<Maybe<string>>(null);
export const explorerTypeTitleAtom = atom<Maybe<string>>(null);
export const magicDispositionAtom = atom<Maybe<string>>(null);

export type AtomType = {
  value: Maybe<string>;
  set: (val: string) => void;
};

export const atomAsObject = (definition: Atom<Maybe<string>>) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setter] = useAtom(definition);
  return { value, set: setter };
};

export const useProfileAtoms = () =>
  useMemo(
    () => ({
      profileImageURL: atomAsObject(profileImageURLAtom),
      bannerImageURL: atomAsObject(bannerImageURLAtom),
      backgroundImageURL: atomAsObject(backgroundImageURLAtom),
      description: atomAsObject(descriptionAtom),
      name: atomAsObject(nameAtom),
      username: atomAsObject(usernameAtom),
      emoji: atomAsObject(emojiAtom),
      location: atomAsObject(locationAtom),
      website: atomAsObject(websiteAtom),
      pronouns: atomAsObject(pronounsAtom),
      availableHours: atomAsObject(availableHoursAtom),
      magicDisposition: atomAsObject(magicDispositionAtom),
      timeZone: atomAsObject(timeZoneAtom),
      explorerTypeTitle: atomAsObject(explorerTypeTitleAtom),
    }),
    [],
  );
