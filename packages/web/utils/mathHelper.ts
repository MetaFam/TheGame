// true if the number is a power of 2
export const isPow2 = (int: number): boolean =>
  int > 0 && (int & (int - 1)) === 0;
