import { TimezoneOptions } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';

export interface TimeZoneDisplay {
  timeZone?: string;
  offset?: string;
}

const getOffsetLabel = (offset: number): string => {
  const offsets = Math.abs(offset).toFixed(1).split('.');
  const hrs = offsets[0];
  const mins = Number(offsets[1]) * 6;
  const offsetString = hrs + (Number(offsets[1]) > 0 ? `:${mins}` : '');

  if (offset > 0) {
    return `(GMT +${offsetString})`;
  }
  if (offset < 0) {
    return `(GMT -${offsetString})`;
  }
  return '(GMT)';
};

export const getPlayerTimeZoneDisplay = (
  player: PlayerFragmentFragment,
): TimeZoneDisplay => {
  let tzLabel;
  let offsetLabel;
  const timezone = TimezoneOptions.find((t) => t.value === player?.timezone);
  if (timezone) {
    const { abbrev, offset, value } = timezone;
    tzLabel = value;
    if (abbrev.length < 5) {
      tzLabel = abbrev;
      offsetLabel = getOffsetLabel(offset);
    }
  }

  return {
    timeZone: tzLabel,
    offset: offsetLabel,
  };
};
