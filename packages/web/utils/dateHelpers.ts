import { PlayerFragmentFragment } from "graphql/autogen/types";
import spacetime from 'spacetime';
import { display } from 'spacetime-informal';

export interface TimeZoneDisplay {
  timeZone?: string;
  offset?: string;
}

export const getPlayerTimeZoneDisplay = (player: PlayerFragmentFragment): TimeZoneDisplay => {
  let tzLabel;
  let offsetLabel;
  if (player?.tz) {
    const timeZone = spacetime.now().goto(player.tz)
    const tzDisplay = display(player.tz)
    if (tzDisplay && tzDisplay.daylight && tzDisplay.standard) {
      tzLabel = timeZone.isDST()
        ? tzDisplay.daylight.abbrev
        : tzDisplay.standard.abbrev;
      const {offset} = timeZone.timezone().current;
      if (offset > 0) {
        offsetLabel = `(GMT +${offset})`;
      } else if (offset < 0) {
        offsetLabel = `(GMT ${offset})`;
      }
    } else {
      tzLabel = player.tz;
    }
  }

  return {
    timeZone: tzLabel,
    offset: offsetLabel
  }
}
  