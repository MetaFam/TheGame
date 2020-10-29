import React, { useEffect, useState, useRef } from 'react';
import Head from '@docusaurus/Head';

export function TypeformWidget(props) {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const widgetStyle = {
    width: '100%',
    height: '500px',
    transition: 'opacity 0.3s ease-in',
    opacity: widgetLoaded ? '1' : '0',
  };

  const typeformStyle = {
    fontFamily: 'Sans-Serif',
    fontSize: '12px',
    color: '#999',
    opacity: '0.5',
    paddingTop: '5px',
  };
  const { campaign } = props;

  useEffect(() => {
    // Typeforms widget JS
    const el = document.getElementById('mg-embedded-typeform');
    const doWidget = setTimeout(() => {
      window.typeformEmbed.makeWidget(
        el,
        'https://form.typeform.com/to/' + campaign,
        {
          hideFooter: true,
          hideHeaders: true,
          opacity: 0,
        },
      );
      setWidgetLoaded(true);
    }, 300);

    doWidget;

    return () => {
      clearTimeout(doWidget);
    };
  }, []);

  return (
    <>
      <Head>
        <script
          src='https://embed.typeform.com/embed.js'
          async
          id='typef_orm'
        ></script>
      </Head>
      <div id='mg-embedded-typeform' style={widgetStyle}></div>
    </>
  );
}
