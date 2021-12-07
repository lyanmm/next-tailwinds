import cn from "classnames";
import Link from 'next/link'
import {useEffect, useRef, useState} from "react";
import {useWindowScroll} from "react-use";
import {IDropDataItemProps} from "../../utils/types";
import {useRouter} from "next/router";
import {dropData} from "../../utils/config";
import {motion} from 'framer-motion'

export default function TopHeader(props) {
  const {y} = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const {y: scrollTop} = useWindowScroll();
  const basicClass = cn('trans-motion fixed left-0 top-0 z-10 w-full flex justify-between items-center h-24 px-90');
  const topStyle = cn('bg-transparent');
  const unTopStyle = cn('bg-white shadow-header text-blue-600');

  function isTop() {
    return scrollTop < y;
  }

  const headerRef = useRef(null);
  const loginRef = useRef(null);
  const regRef = useRef(null);
  const logoRef = useRef(null);
  useEffect(() => {
    headerRef.current.className = cn(isTop() ? topStyle : unTopStyle, basicClass);
    logoRef.current.src = cn(isTop() ? process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/logo.png' : process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/logo-blue.png');
    loginRef.current.className = cn(isTop() ? 'bg-white text-bang' : 'bg-bang text-white',
      'w-24 h-8 text-sm rounded-lg flex justify-center items-center select-none cursor-pointer');
    regRef.current.className = cn(isTop() ? 'bg-transparent text-white border-white' : 'bg-white text-bang border-bang',
      'w-24 h-8 text-sm rounded-lg flex justify-center items-center select-none cursor-pointer border-2');
  });

  return (
    <>
      <nav
        id={'header'}
        ref={headerRef}
        style={{minWidth: 1366, zIndex: 9999}}
        className={cn(topStyle, basicClass)}>
        <Link href={'/'}>
          <div style={{width: '6rem', height: '2.94rem'}}>
            <img ref={logoRef} draggable={false} className={'cursor-pointer w-full h-full'}
                 src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/logo.png'} alt={'logo'}/>
          </div>
        </Link>
        <div className={'hidden md:flex justify-between w-7/12 mr-28'}>
          {dropData.map(value => <DropGroupItem y={y} scrollTop={scrollTop} {...value} key={value.text}/>)}
        </div>

        <div className={'flex space-x-3'}>
          <Link href={'https://lhyg.dasu123.com/oc/#/user/login'} passHref={true}>
            <a
              target={'_blank'}
              ref={loginRef}
              style={{borderRadius: '0.2rem'}}
              className={cn('bg-white text-bang',
                'w-24 h-8 text-sm flex justify-center items-center select-none cursor-pointer')}>登录
            </a>
          </Link>
          <Link href={'https://lhyg.dasu123.com/oc/#/user/register'} passHref={true}>
            <a
              target={'_blank'}
              ref={regRef}
              style={{borderRadius: '0.2rem'}}
              className={cn('bg-transparent text-white border border-white',
                'w-24 h-8 text-sm flex justify-center items-center select-none cursor-pointer')}>立即注册
            </a>
          </Link>
        </div>


        {/*---- mobile ----*/}
        {/*mask*/}
        {/*<motion.div className={'fixed top-0 left-0 w-screen h-screen z-20 md:hidden bg-black'}*/}
        {/*  onAnimationComplete={(definition: any) => definition.opacity === 0 && setIsHidden(true)}*/}
        {/*  onClick={() => setIsOpen(false)}*/}
        {/*  animate={{ opacity: isOpen ? 0.25 : 0 }}*/}
        {/*  transition={{ duration: 0.4 }}*/}
        {/*  hidden={isHidden}*/}
        {/*  initial={false} />*/}
        {/*/!*drawer*!/*/}
        {/*<div*/}
        {/*  className={cn(isOpen ? 'left-0' : '-left-72', 'fixed top-0 z-30 h-screen w-min bg-white md:hidden trans-motion')}>*/}
        {/*  <nav*/}
        {/*    className={'h-full w-72 flex justify-center items-center flex-col divide-y-2 divide-gray-200 px-10 divide-opacity-40'}>*/}
        {/*    {dropData.map((value, index) => {*/}
        {/*      return (*/}
        {/*        <Link key={index} href={value.list ? (value.url + value.list[0].url) : value.url}>*/}
        {/*          <div className={'w-full h-10 pt-2 flex justify-between'} key={index} onClick={() => {*/}
        {/*            setIsOpen(false);*/}
        {/*            setIsHidden(true);*/}
        {/*          }}>*/}
        {/*            {value.text}*/}
        {/*            <RightSvg />*/}
        {/*          </div>*/}
        {/*        </Link>)*/}
        {/*    })}*/}
        {/*  </nav>*/}
        {/*</div>*/}

        {/*<button onClick={() => {*/}
        {/*  setIsOpen(true);*/}
        {/*  setIsHidden(false)*/}
        {/*}} type="button"*/}
        {/*  className="relative w-16 h-16 text-white block md:hidden focus:bg-blue-500 focus:outline-none">*/}
        {/*  <svg width="24" height="24" fill="none"*/}
        {/*    className={cn("absolute top-1/2 left-1/2 -mt-3 -ml-3 transition duration-300 transform")}>*/}
        {/*    <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"*/}
        {/*      strokeLinejoin="round" />*/}
        {/*  </svg>*/}
        {/*</button>*/}
      </nav>
    </>

  )
}


const DropGroupItem = (props: IDropDataItemProps) => {
  const router = useRouter()
  const {text, url, list, scrollTop, y} = props;
  const link = list ? (url + list[0].url) : url;
  const itemTextRef = useRef(null);
  const itemLineRef = useRef(null);
  const baseUrl = router.pathname.split('/')[1] || '/';
  // 判断浏览器URL对应的链接是哪个
  const flag = link.indexOf(baseUrl) === 1 || link === baseUrl;

  useEffect(() => {
    itemTextRef.current.className = (flag ?
      (scrollTop < y ? 'text-white' : 'text-bang') :
      (scrollTop < y ? 'text-white' : 'text-cblack')) + ' trans-motion';
    itemLineRef.current.className = (flag ?
      (scrollTop < y ? 'bg-white w-full' : 'bg-bang w-full') :
      (scrollTop < y ? 'bg-white' : 'bg-cblack'));
  });
  return (
    <div
      className={cn('relative group trans-motion')}>
      <Link href={link}>
        <div id={'link'} className={'text-white cursor-pointer flex-center w-max group'}>
          <div ref={itemTextRef}>{text}</div>
          <div id={'link-line'} ref={itemLineRef}
               style={{height: 2, borderRadius: 1, alignSelf: "start", marginTop: '0.25rem'}}/>
        </div>
      </Link>
      {list && <div
        className={'absolute w-36 -left-10 text-center -top-96 opacity-0 group-hover:opacity-100 group-hover:top-6 trans-opacity'}>
        <div className={'bg-white rounded-lg p-2 mt-3 overflow-hidden'}>
          {list.map((value, index) =>
            <Link href={url + value.url} key={index}>
              <a className={'block hover:text-bang p-2 text-cblack'}>{value.text}</a>
            </Link>
          )}
        </div>
      </div>}
    </div>
  )
}