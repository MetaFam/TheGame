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
