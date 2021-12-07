import TopHeader from "../topHeader/TopHeader";
import React, {useEffect, useRef} from "react";
import BottomFooter from "../bottomFooter/BottomFooter";
import GoTop from "../goTop/GoTop";
import {ILayoutProps} from "../../utils/types";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay} from 'swiper/core';
import Head from "next/head";
import _ from "lodash";
import {useMount, useWindowSize} from "react-use";
import {Nums} from "../nums/Nums";

SwiperCore.use([Autoplay]);

export default function Layout(props: ILayoutProps) {
  const {header, footer, partner, seo, num = false} = props;
  const {width} = useWindowSize();
  const partnerSwiperIns = useRef(null);
  useMount(() => {
    if (partner) {
      // @ts-ignore
      partnerSwiperIns.current = document.querySelector('.partner-container').swiper;
    }
  })
  useEffect(() => {
    if (partner) {
      partnerSwiperIns.current.update();
    }
  }, [width])

  return (
    <>
      <Head>
        {_.keys(seo).map((value, key) =>
          <meta key={value} name={value} content={seo[value].value}/>
        )}
        <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
        <link rel="bookmark" href="/favicon.ico" type="image/x-icon"/>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
      </Head>
      {header && <TopHeader y={header.y}/>}
      <div>
        {props?.children}
      </div>
      {partner &&
      <div style={{backgroundColor: '#22293B', height: '42.375rem'}} className={'flex-center w-full'}>
        <div className={'w-300'}>
          <div className={'w-full flex justify-between items-center mt-28'}>
            <h1 className={'font-bold text-title text-white'}>合作伙伴</h1>
            <h3 className={'text-xl font-medium'} style={{color: '#6D7488'}}>已服务2000+企业</h3>
          </div>
          <Swiper
            className={'w-300 mt-20 partner-container'} loopAdditionalSlides={1}
            preloadImages allowTouchMove={false}
            slidesPerView={5} loop={partner.length > 5}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }} spaceBetween={30}>
            {partner.map((value, index) =>
              <SwiperSlide key={index}>
                <a href={value[0].linkUrl} target={"_blank"} rel="noreferrer">
                  <img style={{width: '13.5rem'}}
                       draggable={false}
                       className={'h-30 bg-gray-50'}
                       src={value[0].imgUrl}
                       alt={value[0].name}/>
                </a>
                {value.length > 1 && <a href={value[1].linkUrl} target={"_blank"} rel="noreferrer">
                  <img style={{width: '13.5rem', marginTop: '1.875rem'}}
                       draggable={false}
                       className={'h-30 bg-gray-50'}
                       src={value[1].imgUrl}
                       alt={value[1].name}/>
                </a>}
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>}

      {/*nums***************************************/}
      {num && <Nums/>}
      {footer && <BottomFooter {...footer}/>}
      <GoTop/>
    </>
  )
}
