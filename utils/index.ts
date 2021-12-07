import {useEffect, useRef} from "react";

export const useSkipFirstTimeEffect = (fn: () => void, deps?: any[], cleanFn?: () => void) => {
  const initRef = useRef(false);
  useEffect(() => {
    if (initRef) {
      fn();
    } else {
      initRef.current = true;
    }
    return () => {
      cleanFn?.();
    }
  }, deps);
}

export const setFontSize = (fontSize: number | string) => {
  document.getElementsByTagName('html')[0].style['font-size'] = fontSize + 'px';
}

export const useObserveElement =
  (el: Element,
   callback: (entry: IntersectionObserverEntry[],
              observer: IntersectionObserver) => void, options?: IntersectionObserverInit): IntersectionObserver => {
    const obs = new IntersectionObserver(callback, options);
    obs.observe(el);
    return obs;
  }