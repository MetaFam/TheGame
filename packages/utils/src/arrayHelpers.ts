export const isNotNullOrUndefined = <T>(x?: T | null): x is T =>
  x !== undefined && x !== null;

export const isDefined = isNotNullOrUndefined;
