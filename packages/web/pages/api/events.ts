import { calendar_v3, google } from 'googleapis';
import { DateTime } from 'luxon';
import { NextApiRequest, NextApiResponse } from 'next';

const options = {
  PRIVATE_KEY: process.env.GOOGLE_CAL_PRIVATE_KEY,
  CLIENT_EMAIL: process.env.NEXT_PUBLIC_GOOGLE_CAL_CLIENT_EMAIL,
  PROJECT_NUMBER: process.env.NEXT_PUBLIC_GOOGLE_CAL_PROJECT_NUMBER,
  CALENDAR_ID: process.env.NEXT_PUBLIC_GOOGLE_CAL_CALENDAR_ID,
  SCOPES: ['https://www.googleapis.com/auth/calendar'],
};

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

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === 'GET') {
    const calId = options.CALENDAR_ID || '';
    const calendarId = `${calId}@group.calendar.google.com`;

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

    if (req.method !== 'GET') {
      res.status(405).end(); // Method Not Allowed
      return;
    }
    const auth = new google.auth.JWT(
      options.CLIENT_EMAIL,
      undefined,
      options.PRIVATE_KEY,
      ['https://www.googleapis.com/auth/calendar.readonly'],
    );

    const calendar = google.calendar({ version: 'v3', auth });

    try {
      const params: calendar_v3.Params$Resource$Events$List = {
        calendarId,
        timeMin: DateTime.now().toISO() || '',
        timeMax: DateTime.now().plus({ days: 30 }).toISO() || '',
        singleEvents: true,
        orderBy: 'startTime',
      };
      const result = await calendar.events.list(params);
      const events = result.data;
      const days = groupEventsByDay(events.items as GoogleCalEventType[]);
      const calData = { events, days };

      res.status(200).json(calData);
    } catch (err) {
      console.error('err', err);
      res.status(500).json({ error: `${err}` });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
