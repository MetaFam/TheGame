import { TimeZoneOptions } from '@metafam/ds';
import { Maybe } from '@metafam/utils';

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
  zone?: Maybe<string>,
): TimeZoneDisplay => {
  let tzLabel;
  let offsetLabel;
  const timeZone = TimeZoneOptions.find((t) => t.name === zone);
  if (timeZone) {
    const { abbreviation, offset, label } = timeZone;
    tzLabel = label;
    if (abbreviation) {
      tzLabel = abbreviation;
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
