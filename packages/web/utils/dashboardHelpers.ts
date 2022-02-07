export type HighLowType = {
  high: string;
  low: string;
};

export function findHighLowPrice(
  days: Array<Array<number>>,
  range: number,
): HighLowType {
  // we only want to get the last 7 of 30 days
  const lastWeek = days.slice(-range);
  const plots = lastWeek.map((d) => d[1]);

  const high = Number(Math.max(...plots)).toFixed(2);
  const low = Number(Math.min(...plots)).toFixed(2);

  return { high, low };
}

export function volumeChange(
  vols: Array<Array<number>>,
  todayVol: Record<string, number>,
): number {
  const plots = [];
  let element: Array<number> = [];

  for (let i = 0; i < vols.length; i++) {
    element = vols[i];
    plots.push({ date: element[0], volume: element[1] });
  }
  const lastVol = plots[plots.length - 2].volume;
  const diff = +todayVol.usd - +lastVol;
  const volPercent = Number((diff / todayVol.usd) * 100);

  return volPercent;
}

type TickerProps = {
  market: MarketProps;
  token_info_url: string;
};

type MarketProps = {
  identifier: string;
};

export const ticker = (
  tickers: Array<TickerProps>,
  pool: string,
): TickerProps => {
  const getTicker = () =>
    tickers?.filter(
      (tick: TickerProps) => tick.market.identifier === pool && tick,
    ) || null;

  return getTicker()[0];
};

export const priceIncreased = (priceChange: number): number =>
  Math.sign(priceChange);

export const volIncreased = (
  vols: number[][],
  vol: Record<string, number>,
): number => Math.sign(volumeChange(vols, vol));
