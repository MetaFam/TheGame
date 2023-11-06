import { Maybe } from '@metafam/utils';
import { CONFIG } from 'config';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useState } from 'react';

type GoogleCalEventDateTimeType =
  | {
      dateTime: string;
      timeZone: string;
    }
  | {
      date: string;
    };

export type GoogleCalEventType = {
  id: string;
  summary: string;
  description: string;
  start: GoogleCalEventDateTimeType;
  end: GoogleCalEventDateTimeType;
  htmlLink: string;
  location: string;
};

type UseCalendarReturnTypes = {
  events: Maybe<GoogleCalEventType[]>;
  timeZone: TimeZonesType;
  fetching: boolean;
  error?: Error;
  ics: string;
  eventsGroupedByDay: GroupedEventsType[];
  totalEvents: number;
  limit: number;
  setLimit: (limit: number) => void;
  cleanDescription: (desc: string) => string;
  buildAddToCalendarLink: (event: GoogleCalEventType) => string;
};

type TimeZonesType = {
  users: string;
  calendar: string;
};

type GroupedEventsType = {
  date: string;
  events: GoogleCalEventType[];
};

type CalendarDataType = {
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
  const { metagameCalendarBackend, calendarId } = CONFIG;
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
  const [error, setError] = useState<Error | undefined>(undefined);
  const calendarICS = `https://calendar.google.com/calendar/ical/${calendarId}%40group.calendar.google.com/public/basic.ics`;

  // strip out the +++cover+++ from the description
  const cleanDescription = (desc: string) =>
    desc ? desc.replace(/(\+\+\+).*(\+\+\+)/, '') : '';

  /**
   * Builds a google calendar event url for adding to your calendar
   * */
  const buildAddToCalendarLink = (event: GoogleCalEventType) => {
    const start =
      'dateTime' in event.start
        ? DateTime.fromISO(event.start.dateTime)
        : DateTime.fromISO(event.start.date);
    const end =
      'dateTime' in event.end
        ? DateTime.fromISO(event.end.dateTime)
        : DateTime.fromISO(event.end.date);
    const title = event.summary;
    const { location } = event;
    const details = `${cleanDescription(event.description)}`;
    const dates = `${start.toFormat('yyyyMMdd')}T${start.toFormat(
      'HHmmss',
    )}/${end.toFormat('yyyyMMdd')}T${end.toFormat('HHmmss')}`;
    const href = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&sf=true&output=xml`;
    return href;
  };

  const fetchCalendarData = useCallback(async (): Promise<void> => {
    try {
      if (calendarData.days.length > 0) return;
      setFetching(true);

      const res = await fetch(metagameCalendarBackend);
      const data = await res.json();
      const { days, events: fetchedEvents, error: errorMsg } = data;

      if (res.status !== 200 || !data) {
        throw new Error(errorMsg || 'Error fetching calendar data.');
      }

      const usersTimeZone =
        DateTime.local().offsetNameShort || fetchedEvents.timeZone;
      const calValues: CalendarDataType = {
        events: fetchedEvents.items,
        days,
        timeZone: { users: usersTimeZone, calendar: fetchedEvents.timeZone },
        totalEvents: fetchedEvents.items.length,
      };
      setCalendarData(calValues);

      setError(undefined);
    } catch (err) {
      console.error(err);
      setError(err as Error);
    } finally {
      setFetching(false);
    }
  }, [metagameCalendarBackend, calendarData]);

  useEffect(() => {
    if (calendarData.days.length > 0) {
      setFetching(false);
      return;
    }

    fetchCalendarData();
  }, [metagameCalendarBackend, calendarData, fetchCalendarData]);

  if (error) {
    console.error('useCalendar error', error);
  }

  return {
    events: calendarData.events,
    timeZone: calendarData.timeZone,
    fetching,
    error,
    ics: calendarICS,
    eventsGroupedByDay: calendarData.days,
    totalEvents: calendarData.totalEvents,
    cleanDescription,
    buildAddToCalendarLink,
    limit,
    setLimit,
  };
};
