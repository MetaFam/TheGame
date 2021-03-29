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
  if (player?.timezone) {
    const timeZone = spacetime.now().goto(player.timezone)
    const tzDisplay = display(player.timezone)
    if (tzDisplay && tzDisplay.daylight && tzDisplay.standard) {
      tzLabel = timeZone.isDST()
        ? tzDisplay.daylight.abbrev
        : tzDisplay.standard.abbrev;
      const { offset } = timeZone.timezone().current;
      if (offset > 0) {
        offsetLabel = `(GMT +${offset})`;
      } else if (offset < 0) {
        offsetLabel = `(GMT ${offset})`;
      }
    } else {
      tzLabel = player.timezone;
    }
  }

  return {
    timeZone: tzLabel,
    offset: offsetLabel,
  }
}
  