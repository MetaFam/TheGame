import { Maybe } from '@metafam/utils';
import { CONFIG } from 'config';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useState } from 'react';

export type GoogleCalEventDateTimeType =
  | {
      date: string;
    }
  | {
      dateTime: string;
      timeZone: string;
    };

export type GoogleCalEventType = {
  id: string;
  summary: string;
  description: string;
  cover?: string;
  start: GoogleCalEventDateTimeType;
  end: GoogleCalEventDateTimeType;
  htmlLink: string;
  location: string;
};

export type UseCalendarReturnTypes = {
  events: Maybe<GoogleCalEventType[]>;
  timeZone: TimeZonesType;
  fetching: boolean;
  error?: Error;
  ics: string;
  eventsGroupedByDay: GroupedEventsType[];
  totalEvents: number;
  limit: number;
  setLimit: (limit: number) => void;
  buildAddToCalendarLink: (event: GoogleCalEventType) => string;
};

type TimeZonesType = {
  users: string;
  calendar: string;
};

export type GroupedEventsType = {
  date: string;
  events: GoogleCalEventType[];
};

export type CalendarDataType = {
  events: Maybe<GoogleCalEventType[]>;
  days: GroupedEventsType[];
  timeZone: TimeZonesType;
  totalEvents: number;
};

/**
 * useCalendar hook to call the metagame calendar backend in `/api/events` and return calendar data
 * @param clamp restricts number of events to show
 * @returns calendar data (events, timezone, fetching, error, ics, eventsGroupedByDay, totalEvents, limit, setLimit)
 */
export const useCalendar = (clamp?: number): UseCalendarReturnTypes => {
  const {
    calendarEndpoint,
    gcal: { calendarId },
  } = CONFIG;
  const [calendarData, setCalendarData] = useState<CalendarDataType>({
    events: null,
    days: [],
    timeZone: {
      users: '',
      calendar: 'Europe/Belgrade',
    },
    totalEvents: 0,
  });
  const [limit, setLimit] = useState<number>(clamp || 0);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<Error>();
  const calendarICS = `https://calendar.google.com/calendar/ical/${calendarId}%40group.calendar.google.com/public/basic.ics`;

  /**
   * sanitize the description & get the cover image url if there is one and return the url & sanitized description
   */
  const cleanDescription = (
    desc: string,
  ): { cover?: string; description: string; originalDesc?: string } => {
    if (!desc) {
      return {
        cover: undefined,
        description: '',
        originalDesc: desc,
      };
    }

    function extractCoverUrl(input: string) {
      const splitInput = input.split('+++<br>');
      const coverSection = splitInput.length > 1 ? splitInput[1] : null;
      const urlRegex = /(https?:\/\/[^"\s<]+)/g;

      let coverUrl;
      const modifiedInput = splitInput[0];

      if (coverSection) {
        const urls = coverSection.match(urlRegex);
        if (urls && urls.length) {
          coverUrl = urls.at(-1);
        }
      }

      return {
        coverUrl,
        modifiedInput,
      };
    }

    const { coverUrl, modifiedInput } = extractCoverUrl(desc);

    const cleanRegex =
      /(^(?:<br>)+|(?:<br>)+$|(?:<br>){2,})|(?:<\w+><\/\w+>\s*)+/g;
    const cleanedDesc = modifiedInput.replace(cleanRegex, '');

    return {
      cover: coverUrl,
      description: cleanedDesc,
      originalDesc: desc,
    };
  };

  /**
   * Builds a google calendar event url for adding to users calendar
   * */
  const buildAddToCalendarLink = (event: GoogleCalEventType) => {
    const start = DateTime.fromISO(
      'dateTime' in event.start ? event.start.dateTime : event.start.date,
    );
    const end = DateTime.fromISO(
      'dateTime' in event.end ? event.end.dateTime : event.end.date,
    );
    const title = event.summary;
    const { location } = event;

    const details = `${
      cleanDescription(event.description).description
    } \n\n<a href="${event.htmlLink}">MetaGame calendar event link</a>`;
    const dates = `${start.toFormat('yyyyMMdd')}T${start.toFormat(
      'HHmmss',
    )}/${end.toFormat('yyyyMMdd')}T${end.toFormat('HHmmss')}`;
    const href =
      'https://www.google.com/calendar/render' +
      `?action=TEMPLATE&text=${title}&dates=${dates}` +
      `&details=${encodeURIComponent(details)}&location=${location}` +
      '&sf=true&output=xml';

    return href;
  };

  const fetchCalendarData = useCallback(async (): Promise<void> => {
    try {
      if (calendarData.days.length > 0) return;
      setFetching(true);

      const res = await fetch(calendarEndpoint);
      const data = await res.json();
      const { days, events: fetchedEvents, error: errorMsg } = data;

      if (res.status !== 200 || !data) {
        throw new Error(errorMsg || 'Error fetching calendar data.');
      }

      const usersTimeZone =
        DateTime.local().offsetNameShort || fetchedEvents.timeZone;

      // Sanitize the events descriptions & get the cover image url if there is one
      const sanitizedEvents = fetchedEvents.items.map(
        (event: GoogleCalEventType) => {
          const { description } = event;
          const { cover, description: cleanedDesc } =
            cleanDescription(description);
          return {
            ...event,
            description: cleanedDesc,
            cover,
          };
        },
      );

      // Sanitize the grouped events descriptions & get the cover image url if there is one
      const sanitizedDays = days.map((day: GroupedEventsType) => {
        const { events } = day;
        const cleanedEvents = events.map((event: GoogleCalEventType) => {
          const { description } = event;
          const { cover, description: cleanedDesc } =
            cleanDescription(description);
          return {
            ...event,
            description: cleanedDesc,
            cover,
          };
        });
        return {
          ...day,
          events: cleanedEvents,
        };
      });

      const calValues: CalendarDataType = {
        events: fetchedEvents.items,
        days: sanitizedDays,
        timeZone: {
          users: usersTimeZone,
          calendar: fetchedEvents.timeZone,
        },
        totalEvents: sanitizedEvents.length,
      };

      setCalendarData(calValues);

      setError(undefined);
    } catch (err) {
      console.error(err);
      setError(err as Error);
    } finally {
      setFetching(false);
    }
  }, [calendarData, calendarEndpoint]);

  useEffect(() => {
    if (calendarData.days.length > 0) {
      setFetching(false);
      return;
    }

    fetchCalendarData();
  }, [calendarData, fetchCalendarData]);

  if (error) {
    console.error({ 'useCalendar error': error });
  }

  return {
    events: calendarData.events,
    timeZone: calendarData.timeZone,
    fetching,
    error,
    ics: calendarICS,
    eventsGroupedByDay: calendarData.days,
    totalEvents: calendarData.totalEvents,
    buildAddToCalendarLink,
    limit,
    setLimit,
  };
};
