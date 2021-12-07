import {useWindowScroll} from "react-use";
import cn from "classnames";
import {useEffect, useRef} from "react";

export default function GoTop(props) {
  const {y: scrollTop} = useWindowScroll();
  const goTopRef = useRef(null);

  useEffect(() => {
    goTopRef.current.className = cn(scrollTop < 500 ? 'hidden' : 'block',
      'trans-motion bg-gray-300 hover:bg-gray-700 bg-opacity-70 w-14 h-14 rounded-full flex justify-center items-center cursor-pointer font-black fixed right-4 bottom-4');
  });

  return (
    <div
      style={{zIndex: 9998}}
      ref={goTopRef}
      onClick={() => {
        window.scrollTo(0, 0);
      }}>
      <img style={{width: '1.25rem', height: '1.69rem'}}
           src={process.env.NEXT_PUBLIC_PREFIX_IMG + "/img/go-top.png"}
           alt=""/>
    </div>
  )
}
