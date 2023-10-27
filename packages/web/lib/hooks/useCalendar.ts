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
  clampedEvents?: Maybe<GoogleCalEventType[]>;
  eventsGroupedByDay: GroupedEventsType[];
  totalEvents: number;
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

export const useCalendar = (limit?: number): UseCalendarReturnTypes => {
  const { metagameCalendarBackend, calendarId } = CONFIG;
  const [events, setEvents] = useState<Maybe<GoogleCalEventType[]>>(null);
  const [timeZone, setTimeZone] = useState<TimeZonesType>({
    users: '',
    calendar: 'Europe/Belgrade',
  });
  const [eventsGroupedByDay, setEventsGroupedByDay] = useState<
    GroupedEventsType[]
  >([]); // [date, events][
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<Error>();
  const totalEvents = events?.length || 0;
  const clampedEvents = events?.slice(0, limit || 0);
  // console.log('useCalendar', {limit, events});
  const calendarICS = `https://calendar.google.com/calendar/ical/${calendarId}%40group.calendar.google.com/public/basic.ics`;

  // strip out the +++cover+++ from the description
  const cleanDescription = (desc: string) =>
    desc ? desc.replace(/(\+\+\+).*(\+\+\+)/, '') : '';

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

  const groupEventsByDay = (items: GoogleCalEventType[]) => {
    const groupedEvents = items.reduce((acc, event) => {
      // console.log('event', {acc, event});

      const start =
        'dateTime' in event.start
          ? DateTime.fromISO(event.start.dateTime)
          : DateTime.fromISO(event.start.date);
      const date = `${start}`;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {} as Record<string, GoogleCalEventType[]>);

    const days = Object.entries(groupedEvents).map(([date, calEvents]) => ({
      date,
      events: calEvents as GoogleCalEventType[],
    }));

    return days;
  };

  useEffect(() => {
    const fetchCalendarData = async (clamp: number): Promise<void> => {
      try {
        setFetching(true);

        const res = await fetch(metagameCalendarBackend);
        const data = await res.json();

        if (res.status !== 200 || !data) {
          throw new Error('Error fetching data');
        }

        const items =
          clamp === 0
            ? data.items.map((item: GoogleCalEventType) => item)
            : data.items.filter(
                (item: GoogleCalEventType, i: number) => i < clamp,
              );
        const usersTimeZone = DateTime.local().offsetNameShort || data.timeZone;
        setEvents(items);
        const groupedEvents = groupEventsByDay(items);
        setEventsGroupedByDay(groupedEvents);
        setTimeZone({ users: usersTimeZone, calendar: data.timeZone });
        setError(undefined);
      } catch (err) {
        console.error(err);
        setError(err as Error);
      } finally {
        setFetching(false);
      }
    };
    fetchCalendarData(limit || 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, metagameCalendarBackend]);

  if (error) {
    console.error('useCalendar error', error);
  }

  return {
    events,
    timeZone,
    fetching,
    error,
    ics: calendarICS,
    clampedEvents,
    eventsGroupedByDay,
    totalEvents,
    cleanDescription,
    buildAddToCalendarLink,
  };
};
