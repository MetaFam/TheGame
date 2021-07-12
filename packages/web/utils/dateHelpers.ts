import { TimezoneOptions } from '@metafam/ds';
import { PlayerFragmentFragment } from 'graphql/autogen/types';

export interface TimeZoneDisplay {
  timeZone?: string;
  offset?: string;
}

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
      if (offset > 0) {
        offsetLabel = `(GMT +${offset})`;
      } else if (offset < 0) {
        offsetLabel = `(GMT ${offset})`;
      }
    }
  }

  return {
    timeZone: tzLabel,
    offset: offsetLabel,
  };
};
