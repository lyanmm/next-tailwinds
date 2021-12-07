import {ICustomButtonProps} from "../../utils/types";
import cn from "classnames";
import {Modal} from "../modal/Modal";
import {useEffect, useRef, useState} from "react";
import {motion} from 'framer-motion'

export default function CustomButton(props: ICustomButtonProps) {
  const {className, style, onClick, animate = true, hoverColor} = props;
  const btnRef = useRef(null);
  const [circleState, setCircleState] = useState({isHover: false, x: 0, y: 0});


  useEffect(() => {
    function mouseEnterHandler(e) {
      setCircleState({isHover: true, x: e.layerX, y: e.layerY});
    }

    function mouseLeaveHandler(e) {
      setCircleState({isHover: false, x: e.layerX, y: e.layerY});
    }

    const btnIns = btnRef.current;
    btnIns.addEventListener('mouseenter', mouseEnterHandler, false);
    btnIns.addEventListener('mouseleave', mouseLeaveHandler, false);
    return () => {
      btnIns.removeEventListener('mouseenter', mouseEnterHandler, false);
      btnIns.removeEventListener('mouseleave', mouseLeaveHandler, false);
    }
  }, [])

  return (
    <div
      ref={btnRef}
      style={style}
      className={cn(className || 'text-white w-50 h-16 bg-bang text-2xl', 'relative overflow-hidden rounded-lg')}>
      <div
        onClick={(e) => {
          if (onClick) {
            onClick();
          } else {
            Modal.open();
          }
        }}
        className={'absolute z-50 w-full h-full bg-transparent flex items-center justify-center select-none cursor-pointer'}>
        {props.children}
      </div>
      {animate && <motion.div
        className={cn(circleState.isHover ? 'w-4 h-4' : 'w-1 h-1', 'absolute rounded-full cursor-pointer')}
        style={{backgroundColor: hoverColor || '#2852EB', left: circleState.x, top: circleState.y}}
        transition={{duration: .3}}
        animate={{
          scale: circleState.isHover ? 40 : 0,
        }}/>}
    </div>
  )
}