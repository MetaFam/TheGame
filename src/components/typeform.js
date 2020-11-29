import React, { useEffect, useState, useRef } from "react";
import Head from "@docusaurus/Head";

export function TypeformWidget(props) {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const widgetStyle = {
    width: "100%",
    height: "500px",
    transition: "opacity 0.3s ease-in",
    opacity: widgetLoaded ? "1" : "0",
  };

  const typeformStyle = {
    fontFamily: "Sans-Serif",
    fontSize: "12px",
    color: "#999",
    opacity: "0.5",
    paddingTop: "5px",
  };
  const { campaign } = props;

  function makeWidget(c) {
    if (typeof document !== "undefined") {
      const el = document.getElementById("mg-embedded-typeform");
      const doWidget = setTimeout(() => {
        window.typeformEmbed.makeWidget(
          el,
          "https://form.typeform.com/to/" + c,
          {
            hideFooter: true,
            hideHeaders: true,
            opacity: 0,
          }
        );
        setWidgetLoaded(true);
      }, 500);

      return doWidget;
    }
  }
  useEffect(() => {
    // Typeforms widget JS
    if (document.readyState !== "loading") {
      makeWidget(campaign);
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        console.log(campaign);
        makeWidget(campaign);
      });
    }

    return () => {
      window.removeEventListener("DOMContentLoaded", makeWidget);
      setWidgetLoaded(!widgetLoaded);
    };
  }, [campaign]);

  return (
    <>
      <Head>
        <script
          src="https://embed.typeform.com/embed.js"
          async
          id="typef_orm"
        ></script>
      </Head>
      <div id="mg-embedded-typeform" style={widgetStyle}></div>
    </>
  );
}
