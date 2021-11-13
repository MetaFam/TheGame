import jstz from 'jstz';
import React from 'react';

const calId = 'nih59ktgafmm64ed4qk6ue8vv4@group.calendar.google.com';

export const Calendar: React.FC = () => {
  const timezone = jstz.determine().name();

  return (
    <iframe
      title="calendar"
      src={`https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=${timezone}&showPrint=0&mode=AGENDA&showTitle=0&showNav=1&showTabs=0&showPrint=0&showCalendars=0&src=${calId}&color=%23F09300`}
      style={{
        border: 'solid 1px #777',
      }}
      width={400}
      height={600}
      scrolling="no"
    />
  );
};
