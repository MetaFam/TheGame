import { TimezoneOptions } from '@metafam/ds';

export interface TimeZoneDisplay {
  timeZone?: string;
  offset?: string;
}

const getOffsetLabel = (offset: number): string => {
  const offsets = Math.abs(offset).toFixed(1).split('.');
  const hrs = offsets[0].toString();
  const mins = `0${(Number(offsets[1]) * 6).toString()}`.slice(-2);
  const offsetString = `${hrs}:${mins}`;

  if (offset < 0) {
    return `(GMT -${offsetString})`;
  }
  return `(GMT +${offsetString})`;
};

export const getPlayerTimeZoneDisplay = (
  playerTimezone: string | undefined | null,
): TimeZoneDisplay => {
  let tzLabel;
  let offsetLabel;
  const timezone = TimezoneOptions.find((t) => t.value === playerTimezone);
  if (timezone) {
    const { abbrev, offset, value } = timezone;
    tzLabel = value;
    if (abbrev.length < 5) {
      tzLabel = abbrev;
      offsetLabel = getOffsetLabel(offset);
    } else if (offset === 0) {
      tzLabel = 'GMT';
      offsetLabel = getOffsetLabel(offset);
    }
  }

  return {
    timeZone: tzLabel,
    offset: offsetLabel,
  };
};
