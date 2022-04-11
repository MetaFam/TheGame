export const getNumWeeksInSeason = (currentDate: Date = new Date()): number => {
  const currentYear = currentDate.getFullYear();

  const lastYear = currentDate.getFullYear() - 1;

  const seasons = [
    new Date(Date.parse(`${lastYear}-12-21T00:00:00+00:00`)), // 21 Dec last year
    new Date(Date.parse(`${currentYear}-03-20T00:00:00+00:00`)), // 20 Mar this year
    new Date(Date.parse(`${currentYear}-06-21T00:00:00+00:00`)), // 21 June this year
    new Date(Date.parse(`${currentYear}-09-22T00:00:00+00:00`)), // 22 Sept this year
    new Date(Date.parse(`${currentYear}-12-21T00:00:00+00:00`)), // 21 Dec this year
  ];

  const currentSeason = seasons.reduce(
    (t, a) => (a.getTime() < currentDate.getTime() ? a : t),
    new Date('1970-01-01T00:00:00+00:00'),
  );

  return Math.ceil(
    (currentDate.getTime() - currentSeason.getTime()) /
      (1000 * 60 * 60 * 24 * 7),
  );
};

export const getSeasonNum = (currentDate: Date = new Date()): number => {
  const GAME_STARTED = new Date('2020-12-21');

  const seasons = [];

  let activeDate = new Date(GAME_STARTED);
  let activeIndex = 4;

  const SEASON_START = [
    // SPRING_START
    new Date(
      activeDate.getFullYear(),
      2,
      activeDate.getFullYear() % 4 === 0 ? 19 : 20,
    ),

    // SUMMER_START
    new Date(
      activeDate.getFullYear(),
      5,
      activeDate.getFullYear() % 4 === 0 ? 20 : 21,
    ),

    // AUTUMN_START
    new Date(
      activeDate.getFullYear(),
      8,
      activeDate.getFullYear() % 4 === 0 ? 22 : 23,
    ),

    // WINTER_START
    new Date(
      activeDate.getFullYear(),
      11,
      activeDate.getFullYear() % 4 === 0 ? 20 : 21,
    ),
  ];

  while (currentDate > activeDate) {
    seasons.push(activeDate);

    if (activeIndex === SEASON_START.length) {
      const newDate = new Date(activeDate).setFullYear(
        activeDate.getFullYear() + 1,
      );
      activeDate = new Date(newDate);
      activeIndex = 0;
    }

    const nextDate = SEASON_START[activeIndex];
    nextDate.setFullYear(activeDate.getFullYear());
    activeDate = new Date(nextDate);
    activeIndex += 1;
  }

  return seasons.length;
};
