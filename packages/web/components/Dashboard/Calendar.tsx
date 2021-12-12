/* eslint-disable */
// import { zonedTimeToUtc, format, utcToZonedTime } from 'date-fns-tz';
// import ical from 'cal-parser';
// import useSWR from 'swr';
import { CONFIG } from 'config';
import React, { useEffect, useState } from 'react';

export const Calendar: React.FC = () => {
  // const getTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

  // const [url, setUrl] = useState<string | null>(null);
  // console.log('url', url);
  // const { data, error } = useSWR(url, (d) => {
  //   console.log(d);
  // });

  // const lol = async () => {
  //   if (url) {
  //     const userTimezone = getTimezone();
  //     console.log('userTimezone', userTimezone);

  //     const icsRes = await fetch(url);
  //     const icsData = await icsRes.text();

  //     const today = new Date();
  //     const sixDaysFromNow = new Date(new Date().setDate(today.getDate() + 7));

  //     console.log(
  //       'ical.parseString(icsData)',
  //       ical.parseString(icsData).events.filter((e) => e.recurrenceRule),
  //     );

  //     const data = ical
  //       .parseString(icsData)
  //       .getEventsBetweenDates(today, sixDaysFromNow);
  //     console.log('data', data);
  //     const parsed = data.map((event: any) => {
  //       // const dateStart = calenDate(event.acknowledged.value)
  //       // const dateEnd = calenDate(event.acknowledged.value)

  //       return {
  //         title: event.summary.value,
  //         // description: event.description.value,
  //         // start: format(event.dtstart.value, 'HH:mm'),
  //         // end: format(event.dtend.value, 'HH:mm'),
  //         params: event.dtstart.params,
  //         matchingDate: event.matchingDates[0],
  //         start: event.dtstart.value,
  //         rule: event.recurrenceRule,
  //         // day: format(event.dtstart.value, 'iiii • dd LLL yyyy'),
  //       };
  //     });
  //     console.log('parsed', parsed);

  //     const date = new Date('2021-12-15T07:00:00.000Z');
  //     const timeZone = 'America/Los_Angeles';

  //     const utcDate = zonedTimeToUtc(date, timeZone);
  //     console.log(utcDate);

  //     const timezones = parsed
  //       .filter((x) => x.params)
  //       .map((p) => ({
  //         title: p.title,
  //         // startToUser: zonedTimeToUtc(p.start, p.params.tzid),
  //         something: p.rule.origOptions.dtstart,
  //         toUserTimezone: zonedTimeToUtc(
  //           p.rule.origOptions.dtstart,
  //           p.params.tzid,
  //         ),
  //         // utc: zonedTimeToUtc(
  //         //   zonedTimeToUtc(p.matchingDate, userTimezone),
  //         //   p.params.tzid,
  //         // ),
  //         // time: new Date(+zonedTimeToUtc(p.matchingDate, p.params.tzid)),
  //         // date: utcToZonedTime(
  //         //   zonedTimeToUtc(p.matchingDate, p.params.tzid),
  //         //   userTimezone,
  //         // ),
  //         day: p.rule.origOptions.dtstart.getDay(),
  //         tz: p.rule.origOptions.dtstart.getUTCDate(),
  //         Day: p.rule.origOptions.dtstart.getUTCDay(),
  //         Milliseconds: p.rule.origOptions.dtstart.getUTCMilliseconds(),
  //         toISOString: p.rule.origOptions.dtstart.toISOString(),
  //         toGMTString: p.rule.origOptions.dtstart.toGMTString(),
  //         offset: p.rule.origOptions.dtstart.getTimezoneOffset(),
  //       }));
  //     console.log('timezones', timezones);
  //   }
  // };

  // lol();

  // function calenDate(icalStr) {
  //   // icalStr = '20110914T184000Z'
  //   const strYear = icalStr.substr(0, 4);
  //   const strMonth = icalStr.substr(4, 2);
  //   const strDay = icalStr.substr(6, 2);
  //   const strHour = icalStr.substr(9, 2);
  //   const strMin = icalStr.substr(11, 2);
  //   const strSec = icalStr.substr(13, 2);

  //   const oDate = new Date(strYear, strMonth, strDay, strHour, strMin, strSec);

  //   return oDate;
  // }

  // useEffect(() => {
  //   setUrl(`${window.location.origin}/metagame/calendar`);
  // }, []);
  const [isComponentMounted, setIsComponentMounted] = useState(false);

  useEffect(() => setIsComponentMounted(true), []);

  if (!isComponentMounted) {
    return null;
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <iframe
      title="calendar"
      src={`https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=${timezone}&showPrint=0&mode=AGENDA&showTitle=0&showNav=1&showTabs=0&showPrint=0&showCalendars=0&src=${CONFIG.calendarId}&color=%23F09300`}
      style={{
        // border: 'solid 1px #777',
        marginTop: 20,
      }}
      width="100%"
      height="110%"
      scrolling="no"
    />
  );
};
