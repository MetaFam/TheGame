// true if the number is a power of 2
export const isPow2 = (int: number): boolean => (
  // eslint-disable-next-line no-bitwise
  int > 0 && (int & (int - 1)) === 0
);