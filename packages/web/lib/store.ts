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
