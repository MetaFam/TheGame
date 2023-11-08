import { CONFIG } from 'config';
import { calendar_v3, google } from 'googleapis';
import { DateTime } from 'luxon';
import { NextApiRequest, NextApiResponse } from 'next';

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
export const cleanDescription = (desc: string): string =>
  desc ? desc.replace(/(\+\+\+).*(\+\+\+)/, '') : desc;

export const matchHostToPattern = (host: string, pattern: string): boolean => {
  const regexPattern = pattern
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '.*');

  const regex = new RegExp(`^${regexPattern}$`);

  return regex.test(host);
};

export const isHostWhitelisted = (host: string, whitelist: string[]): boolean =>
  whitelist.some((pattern) => matchHostToPattern(host, pattern));

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { publicURL, gcal } = CONFIG;
  const calendarId = `${gcal.calendarId}@group.calendar.google.com`;

  const canWhitelist = publicURL && gcal.whitelist.length > 0;
  const isWhitelisted = canWhitelist
    ? isHostWhitelisted(publicURL, gcal.whitelist)
    : true;

  // eslint-disable-next-line no-console
  console.debug({ gcal });

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Only GET requests allowed.' });
    return;
  }
  if (!isWhitelisted) {
    res.status(403).json({
      error: `Traffic not allowed from ${publicURL}.`,
    });
    return;
  }
  if (!gcal.privateKey || !gcal.clientEmail) {
    res.status(500).json({ error: 'Missing Calendar Credentials' });
    return;
  }
  if (!gcal.calendarId) {
    res.status(500).json({ error: 'Missing Calendar ID' });
    return;
  }

  const groupEventsByDay = (items: GoogleCalEventType[]) => {
    const groupedEvents = items.reduce((acc, event) => {
      const start =
        'dateTime' in event.start
          ? DateTime.fromISO(event.start.dateTime, {
              zone: event.start.timeZone,
            }).toLocal()
          : DateTime.fromISO(event.start.date).toLocal();

      const dateKey = start.toFormat('yyyy-MM-dd');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {} as Record<string, GoogleCalEventType[]>);

    const days = Object.entries(groupedEvents).map(([date, calEvents]) => ({
      date,
      events: calEvents as GoogleCalEventType[],
    }));

    return days;
  };

  const auth = new google.auth.JWT(
    gcal.clientEmail,
    undefined,
    gcal.privateKey,
    ['https://www.googleapis.com/auth/calendar.readonly'],
  );

  const calendar = google.calendar({ version: 'v3', auth });

  try {
    const params: calendar_v3.Params$Resource$Events$List = {
      calendarId,
      timeMin: new Date().toISOString(),
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
    console.error({ err });
    res.status(500).json({ error: (err as Error).message });
  }
};
