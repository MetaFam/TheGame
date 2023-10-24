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
};

type TimeZonesType = {
  users: string;
  calendar: string;
};

export const useCalendar = (limit?: number): UseCalendarReturnTypes => {
  const { metagameCalendarBackend } = CONFIG;
  const [events, setEvents] = useState<Maybe<GoogleCalEventType[]>>(null);
  const [timeZone, setTimeZone] = useState<TimeZonesType>({
    users: '',
    calendar: 'Europe/Belgrade',
  });
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<Error>();
  // console.log('useCalendar', {limit, events});

  useEffect(() => {
    const fetchCalendarData = async (clamp: number): Promise<void> => {
      try {
        setFetching(true);

        const res = await fetch(metagameCalendarBackend);
        const { data } = await res.json();
        if (res.status !== 200) {
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
        setTimeZone({ users: usersTimeZone, calendar: data.timeZone });
        setFetching(false);
      } catch (err) {
        console.error(err);
        setFetching(false);
        setError(err as Error);
      }
    };
    fetchCalendarData(limit || 0);

    return () => {};
  }, [limit, metagameCalendarBackend]);

  if (error) {
    console.error('useCalendar error', error);
  }

  return {
    events,
    timeZone,
    fetching,
    error,
  };
};
