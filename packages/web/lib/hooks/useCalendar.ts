import { Maybe } from '@metafam/utils';
import { useEffect, useMemo, useState } from 'react';

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
  timeZone: string;
  fetching: boolean;
  error?: Error;
};

export const useCalendar = (): UseCalendarReturnTypes => {
  const [events, setEvents] = useState<Maybe<GoogleCalEventType[]>>(null);
  const [timeZone, setTimeZone] = useState<string>('Europe/Belgrade');
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<Error>();



  useEffect(() => {
    console.log('useCalendar events');
    const fetchCalendarData = async (): Promise<void> => {
      try {
        setFetching(true);

        const scheduleEndpoint = 'https://mgapi.luxumbra.dev/events';

        const res = await fetch(scheduleEndpoint);
        const {data} = await res.json();
        console.log('data', data);
        if (res.status !== 200) {
          throw new Error('Error fetching data');
        }

        setEvents(data.items);
        setTimeZone(data.timeZone);
        setFetching(false);

      } catch (err) {
        const msg = `${err}`;
        console.error(err);
        setFetching(false);
        setError(err as Error);
      }
    }
    fetchCalendarData();

    return () => {
      console.log('useCalendar cleanup');

    }
  }, []);

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
