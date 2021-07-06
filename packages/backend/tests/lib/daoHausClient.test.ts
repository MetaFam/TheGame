import { getClient } from '../../src/lib/daoHausClient';

describe('daoHausClient', () => {
  it('should throw error for unknown chain', () => {
    expect(() => getClient('garbage')).toThrow();
  });

  it('should return a client when chain is configured', () => {
    expect(getClient('ethereum')).toBeDefined();
  });
});
