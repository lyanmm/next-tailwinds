import '../styles/globals.css'
import type {AppProps} from 'next/app'
import "tailwindcss/tailwind.css";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import {useEffect} from "react";
import {setFontSize} from "../utils";


function MyApp({Component, pageProps}: AppProps) {
  useEffect(() => {
    function resizeHandler() {
      const clientWidth = document.documentElement.clientWidth;
      const fontSize = ((clientWidth * 16) / 1920).toFixed(2);
      if (clientWidth >= 1250) {
        setFontSize(fontSize);
      }
    }

    if (document.documentElement.clientWidth < 1900) {
      const clientWidth = document.documentElement.clientWidth;
      const fontSize = ((clientWidth * 16) / 1920).toFixed(2);
      setFontSize(fontSize);
    }

    if (document.documentElement.clientWidth < 1400 && document.documentElement.clientWidth > 1350) {
      const clientWidth = document.documentElement.clientWidth;
      const fontSize = ((clientWidth * 16) / 1920).toFixed(2);
      setFontSize(fontSize);
    } else {
      window.addEventListener("resize", resizeHandler);
    }

    // const fontSize = ((document.documentElement.clientWidth * 16) / 1920).toFixed(2);
    // setFontSize(fontSize);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    }
  })
  return <Component {...pageProps} />
}

export default MyApp
