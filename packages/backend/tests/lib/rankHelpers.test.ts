import { PlayerRank_Enum } from '../../src/lib/autogen/hasura-sdk';
import { computeRank, RANKED_CAP } from '../../src/lib/rankHelpers';

describe('RANKED_CAP', () => {
  it('should equal 56', () => {
    expect(RANKED_CAP).toBe(56);
  });
});

describe('computeRank', () => {
  it('index 6 should be diamond', () => {
    expect(computeRank(6)).toBe(PlayerRank_Enum.Diamond)
  });
  it('index 7 should be platinum', () => {
    expect(computeRank(7)).toBe(PlayerRank_Enum.Platinum)
  });
  it('index 20 should be gold', () => {
    expect(computeRank(20)).toBe(PlayerRank_Enum.Gold)
  });
  it('index 21 should be silver', () => {
    expect(computeRank(21)).toBe(PlayerRank_Enum.Silver)
  });
  it('index 55 should be bronze', () => {
    expect(computeRank(55)).toBe(PlayerRank_Enum.Bronze)
  });
  it('index 56 should not be ranked', () => {
    expect(computeRank(56)).toBeNull();
  });
})
