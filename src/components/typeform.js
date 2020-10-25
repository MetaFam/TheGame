import React, { useEffect } from 'react';

export const widgetStyle = {
  width: '100%',
  height: '500px',
};

export const typeformStyle = {
  fontFamily: 'Sans-Serif',
  fontSize: '12px',
  color: '#999',
  opacity: '0.5',
  paddingTop: '5px',
};

// Typeforms widget JS
export function TypeformForm() {
  let tf;
  useEffect(() => {
    tf = () => {
      var qs,
        js,
        q,
        s,
        d = document,
        gi = d.getElementById,
        ce = d.createElement,
        gt = d.getElementsByTagName,
        id = 'typef_orm',
        b = 'https://embed.typeform.com/';
      if (!gi.call(d, id)) {
        js = ce.call(d, 'script');
        js.id = id;
        js.src = b + 'embed.js';
        q = gt.call(d, 'script')[0];
        q.parentNode.insertBefore(js, q);
      }
    };
    return tf;
  }, []);
  return true;
}

export function TypeformWidget(props) {
  const { campaign } = props;
  return (
    <>
      <div
        className='typeform-widget'
        data-url={`https://form.typeform.com/to/${campaign}`}
        data-transparency='100'
        data-hide-headers={true}
        data-hide-footer={true}
        style={widgetStyle}
      ></div>
      <TypeformForm />
      <div style={typeformStyle}>
        {' '}
        powered by{' '}
        <a
          href={`https://admin.typeform.com/signup?utm_campaign=${campaign}&utm_source=typeform.com-01D8JV4RFNXKWZS09JM1RS3PNX-essentials&utm_medium=typeform&utm_content=typeform-embedded-poweredbytypeform&utm_term=EN`}
          style={{ color: '#999' }}
          target='_blank'
        >
          Typeform
        </a>{' '}
      </div>
    </>
  );
}
