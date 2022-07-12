import {
  getNumWeeksInSeason,
  getSeasonNum,
  isNewSeason,
} from '../../src/xpHelpers';

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

describe('getSeasonNum', () => {
  it('Dec 22 should be season 1', () => {
    const Dec22nd = new Date(Date.parse(`2020-12-22T00:01:00+00:00`));
    expect(getSeasonNum(Dec22nd)).toBe(1);
  });

  it('April 1st 2022 should be season 6', () => {
    const Apr1st = new Date(Date.parse(`2022-04-01T00:01:00+00:00`));
    expect(getSeasonNum(Apr1st)).toBe(6);
  });
});

describe('isNewSeason', () => {
  it('June 20 should not be a new season', () => {
    const date = new Date(Date.parse(`2022-06-20T00:00:00+00:00`));
    expect(isNewSeason(date)).toBe(false);
  });
  it('June 21 should be a new season', () => {
    const date = new Date(Date.parse(`2022-06-21T00:01:00+00:00`));
    expect(isNewSeason(date)).toBe(true);
  });
  it('June 22 should not be a new season', () => {
    const date = new Date(Date.parse(`2022-06-22T00:01:00+00:00`));
    expect(isNewSeason(date)).toBe(false);
  });
});
