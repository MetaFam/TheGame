import { getNumWeeksInSeason, getSeasonNum } from '../../src/xpHelpers';

describe('getNumWeeksInSeason', () => {
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();

  it('Jan 1st should be 2 weeks into the season', () => {
    const Jan1st = new Date(Date.parse(`${currentYear}-01-01T00:00:00+00:00`));
    expect(getNumWeeksInSeason(Jan1st)).toBe(2);
  });
  it('Jan 5th should be 3 weeks into the season', () => {
    const Jan5th = new Date(Date.parse(`${currentYear}-01-05T00:00:00+00:00`));
    expect(getNumWeeksInSeason(Jan5th)).toBe(3);
  });
  it('March 21st should be 1 week into the season', () => {
    const Mar21st = new Date(Date.parse(`${currentYear}-03-21T00:00:00+00:00`));
    expect(getNumWeeksInSeason(Mar21st)).toBe(1);
  });
  it('June 21st 00:00hrs should be 14 week into the season', () => {
    const Jun21st = new Date(Date.parse(`${currentYear}-06-20T00:00:00+00:00`));
    expect(getNumWeeksInSeason(Jun21st)).toBe(14);
  });
  it('June 21st 01:00hrs should be 1 week into the season', () => {
    const Jun21st = new Date(Date.parse(`${currentYear}-06-21T00:01:00+00:00`));
    expect(getNumWeeksInSeason(Jun21st)).toBe(1);
  });
});
