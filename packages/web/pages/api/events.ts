import { calendar_v3, google } from 'googleapis';
import { DateTime } from 'luxon';
import { NextApiRequest, NextApiResponse } from 'next';

const options = {
  GOOGLE_PRIVATE_KEY: process.env.private_key,
  GOOGLE_CLIENT_EMAIL: process.env.client_email,
  GOOGLE_PROJECT_NUMBER: process.env.project_number,
  GOOGLE_CALENDAR_ID: process.env.calendar_id,
  SCOPES: ['https://www.googleapis.com/auth/calendar'],
  client_email: process.env.client_email,
  private_key: process.env.private_key,
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method === 'GET') {
    const calId = options.GOOGLE_CALENDAR_ID || '';
    const calendarId = `${calId}@group.calendar.google.com`;

    const auth = new google.auth.JWT(
      options.client_email,
      undefined,
      options.private_key,
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

      const events = result.data.items;

      res.status(200).json(events);
    } catch (err) {
      console.error('err', err);
      res.status(500).json({ error: `${err}` });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
