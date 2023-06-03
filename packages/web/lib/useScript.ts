import { useEffect } from 'react';

const useScript = (url: string) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default useScript;

/* <script>
window.CustomSubstackWidget = {
  substackUrl: "metagame.substack.com",
  placeholder: "example@gmail.com",
  buttonText: "Subscribe",
  theme: "custom",
  colors: {
    primary: "#FF03FF",
    input: "#2E0A67",
    email: "#FF03FF",
    text: "#000000",
  }
};
</script>
<script src="https://substackapi.com/widget.js" async></script> */
