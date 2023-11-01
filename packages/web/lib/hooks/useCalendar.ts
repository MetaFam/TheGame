import { Maybe } from '@metafam/utils';
import { CONFIG } from 'config';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

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

/**
 * useCalendar hook to call the metagame calendar backend in `/api/events` and return calendar data
 * @param clamp restricts number of events to show
 * @returns calendar data (events, timezone, fetching, error, ics, eventsGroupedByDay, totalEvents, limit, setLimit)
 */
export const useCalendar = (clamp?: number): UseCalendarReturnTypes => {
  const { metagameCalendarBackend, calendarId } = CONFIG;
  const [events, setEvents] = useState<Maybe<GoogleCalEventType[]>>(null);
  const [timeZone, setTimeZone] = useState<TimeZonesType>({
    users: '',
    calendar: 'Europe/Belgrade',
  });
  const [limit, setLimit] = useState<number>(clamp || 0);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [eventsGroupedByDay, setEventsGroupedByDay] = useState<
    GroupedEventsType[]
  >([]);
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

  useEffect(() => {
    const fetchCalendarData = async (): Promise<void> => {
      try {
        setFetching(true);

        const res = await fetch(metagameCalendarBackend);
        const data = await res.json();
        const { days, events: fetchedEvents } = data;

        if (res.status !== 200 || !data) {
          throw new Error('Error fetching data');
        }

        setTotalEvents(fetchedEvents.items.length);

        const items = fetchedEvents.items.map(
          (item: GoogleCalEventType) => item,
        );
        const usersTimeZone =
          DateTime.local().offsetNameShort || fetchedEvents.timeZone;
        setEvents(items);
        const groupedEvents = days;
        setEventsGroupedByDay(groupedEvents);
        setTimeZone({ users: usersTimeZone, calendar: fetchedEvents.timeZone });
        setError(undefined);
      } catch (err) {
        console.error(err);
        setError(err as Error);
      } finally {
        setFetching(false);
      }
    };

    if (events) {
      setFetching(false);
      return;
    }

    fetchCalendarData();
  }, [metagameCalendarBackend, events]);

  if (error) {
    console.error('useCalendar error', error);
  }

  return {
    events,
    timeZone,
    fetching,
    error,
    ics: calendarICS,
    eventsGroupedByDay,
    totalEvents,
    cleanDescription,
    buildAddToCalendarLink,
    limit,
    setLimit,
  };
};
