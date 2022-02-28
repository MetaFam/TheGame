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
  { usd: today }: Record<string, number>,
): number {
  const plots = vols.map(([date, volume]) => ({ date, volume }));
  if (plots.length < 2) {
    throw new Error('Insufficient Data');
  }
  const [{ volume: previous }] = plots.slice(-2);
  const Δ = today - previous;
  const percent = Number((Δ / today) * 100);

  return percent;
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
