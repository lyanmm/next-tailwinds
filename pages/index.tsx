import Layout from "../components/layout/Layout";
import Head from 'next/head'
import cn from "classnames";
import Link from "next/link";
import {Http} from "../utils/http";
import {Article, Banner, CommonSettings, IArrowProps, PartnerLink, SEO} from "../utils/types";
import CustomButton from "../components/customButton/CustomButton";
import {useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay, Mousewheel, Pagination} from 'swiper/core';
import _ from 'lodash'
import {RightSvg} from "../components/rightSvg/RightSvg";
import {useWindowSize} from "react-use";

SwiperCore.use([Pagination, Autoplay, Mousewheel]);

export default function Home() {
  const [setting, setSetting] = useState({} as CommonSettings);
  const [banner, setBanner] = useState([] as Banner[]);
  const [seo, setSeo] = useState({} as SEO);
  const [links, setLinks] = useState([] as PartnerLink[][]);
  const [news, setNews] = useState([] as Article[][]);
  const [solution, setSolution] = useState([] as Article[]);

  const basicSize = 'h-full w-full';
  const [currAdIndex, setCurrAdIndex] = useState(0);
  const adSwiperIns = useRef(null);
  const solSwiperIns = useRef(null);
  const newsSwiperIns = useRef(null);
  const {width} = useWindowSize();

  const bannerPagination = {
    "clickable": true,
    "renderBullet": function (index, className) {
      return '<div class=\"' + className + '\"></div>';
    },
    bulletClass: 'banner-bullet',
    bulletActiveClass: 'banner-bullet-active',
  }

  useEffect(() => {
    Http.getCommonSettings("index").then(({data: commonData}) => {
      const banner = commonData.banner;
      const setting = commonData.setting;
      const SEO = commonData.seo;
      setSeo(SEO);
      setBanner(banner);
      setSetting(setting);
    });
    Http.getHomeData().then(({data: homeData}) => {
      setSolution(homeData.solution);
      setNews(_.chunk([...homeData.case, ...homeData.company], 3));
    })
    Http.getPartnerLinks().then(({data: {partner: links}}) => {
      setLinks(_.chunk(links, 2));
    });
    // @ts-ignore
    adSwiperIns.current = document.querySelector('.ad-container').swiper;
    // @ts-ignore
    newsSwiperIns.current = document.querySelector('.news-container').swiper;
    // @ts-ignore
    solSwiperIns.current = document.querySelector('.sol-container').swiper;

  }, [])

  useEffect(() => {
    adSwiperIns.current.update();
    newsSwiperIns.current.update();
    solSwiperIns.current.update();
  }, [width]);

  return (
    <>
      <Layout header={{y: 200}} partner={links} footer={setting} seo={seo} num>
        <Head>
          <title>邦乎</title>
        </Head>
        {/*banner*************************/}
        <div className={'relative flex-center h-screen w-full '}>
          <Swiper mousewheel={{releaseOnEdges: true}} autoplay={{delay: 3000, disableOnInteraction: false,}} speed={500}
                  allowTouchMove={false}
                  pagination={bannerPagination} direction={'vertical'} className={'h-full w-full absolute top-0'}>
            {banner.map(value =>
              <SwiperSlide key={value.name}>
                <a href={value.linkUrl} target={"_blank"} rel={"noreferrer"}>
                  <img loading={'lazy'} className={'h-screen w-full cursor-pointer object-cover'} draggable={false}
                       src={value?.imgUrl || ''}/>
                </a>
              </SwiperSlide>
            )}
            <div
              style={{
                position: "absolute",
                zIndex: 20,
                animation: 'arrow-animate 2s ease-in-out infinite',
                right: '59rem'
              }}
              className={'transform rotate-45 border-white border-b-4 border-r-4 w-5 h-5 cursor-pointer hover:border-bang hover:border-opacity-90'}
              onClick={() => {
                document.querySelector('.ad-container').scrollIntoView({behavior: "smooth"})
              }}/>
          </Swiper>
          {/*<div className={'absolute top-48 flex-center z-10 w-max'}>*/}
          {/*  <p className={'text-title font-bold text-white select-none'}>专注解决企业用工成本问题</p>*/}
          {/*  <div className={'flex w-full justify-between items-center mt-4'}>*/}
          {/*    <div className={'w-16 h-1'} style={{backgroundImage: 'radial-gradient(white, transparent)'}}/>*/}
          {/*    <p className={'text-2xl text-white font-medium select-none flex items-center'}>邦乎，企业人力资源服务平台</p>*/}
          {/*    <div className={'w-16 h-1'} style={{backgroundImage: 'radial-gradient(white, transparent)'}}/>*/}
          {/*  </div>*/}
          {/*  <CustomButton*/}
          {/*    hoverColor={'#fff'}*/}
          {/*    className={'w-50 h-16 border-2 border-white text-white hover:text-bang trans-motion text-2xl mt-14'}>*/}
          {/*    预约体验</CustomButton>*/}
          {/*</div>*/}
        </div>

        {/*ad*****************************/}
        <Swiper style={{height: '53.75rem'}} className={'ad-container'} allowTouchMove={false}>
          {advan && advan.map((value, index) =>
            <SwiperSlide key={value.id}>
              <div className={cn(basicSize, 'bg-gray-100 flex')}>
                <div className={'w-240 h-full bg-white relative'}>
                  <div style={{
                    width: '14rem',
                    height: '11.0625rem',
                    marginTop: '11rem',
                    marginLeft: '22.5rem'
                  }} key={index}>
                    <img loading={'lazy'} className={'w-full h-full'} draggable={false}
                         src={process.env.NEXT_PUBLIC_PREFIX_IMG + value.numImg}/>
                  </div>
                  <div className={'absolute top-72 left-90'}>
                    <div className={'mb-24'} key={index}>
                      <p className={'text-cblack font-bold select-none text-title'}>{value.title}</p>
                      <ul className={'space-y-7 mt-14 ml-6'}>
                        {value.list.map((item) =>
                          <li key={item} className={'list-disc text-2xl select-none'}>{item}</li>)}
                      </ul>
                    </div>
                    <CustomButton>立即咨询</CustomButton>
                  </div>
                </div>

                <div className={'w-240 h-full bg-white flex items-center justify-center pr-48'}>
                  <video
                    id={'homepage-video-' + (index + 1)}
                    autoPlay={true} loop={true}
                    muted={true}
                    preload={'auto'}
                    style={{width: '28.75rem', height: '35.88rem'}}>
                    <source src={process.env.NEXT_PUBLIC_PREFIX_IMG + `/img/advantage-${value.id + 1}.mp4`}
                            type={'video/mp4'}/>
                  </video>
                </div>
              </div>
            </SwiperSlide>
          )}
          <div style={{right: '30rem'}} className={'absolute bottom-28 z-10 flex space-x-4'}>
            {[0, 1, 2].map((value, index) =>
              <div key={index}
                   onClick={() => {
                     setCurrAdIndex(index);
                     // @ts-ignore
                     adSwiperIns.current.slideTo(index);
                   }}
                   style={{backgroundColor: currAdIndex === index ? '#3F77FF' : '#e0e5f5', height: '0.4rem'}}
                   className={cn('rounded-lg w-12 cursor-pointer')}/>)}
          </div>
        </Swiper>

        {/*sol****************************************/}
        <div style={{height: '50rem'}} className={cn(basicSize, 'bg-cbgray relative flex justify-center items-center')}>
          <div className={'absolute left-90 top-20'}>
            <p className={'font-bold text-title text-cblack select-none'}>行业案例</p>
          </div>
          <Link href={'/case' + process.env.NEXT_PUBLIC_SUFFIX_HTML}>
            <div
              className={'absolute right-90 top-25 z-40'}>
              <CustomButton
                onClick={()=>{}}
                style={{border: '1px solid #DADDE6', width: '8.25rem', height: '3rem'}}
                className={'text-cfgray select-none cursor-pointer rounded hover:text-white trans-motion flex-center justify-center'}>
                更多案例
              </CustomButton>
            </div>
          </Link>
          <div style={{width: '87rem'}} className={'flex justify-between items-center mt-20'}>
            <LeftArrow onClick={() => {
              solSwiperIns.current.slidePrev()
            }}/>
            <Swiper allowTouchMove={false} updateOnWindowResize loop={true} spaceBetween={30}
                    className={'w-300 sol-container'}>
              {solution && solution.map((value, index) =>
                <SwiperSlide key={index}>
                  <a
                    href={process.env.NEXT_PUBLIC_NEW_PAGE + '/case/detail' + process.env.NEXT_PUBLIC_SUFFIX_HTML + '?id=' + value.id}
                    target={"_blank"}
                    rel={'noreferrer'}>
                    <div className={'cursor-pointer h-100 bg-white rounded-lg overflow-hidden flex'}>
                      <div className={'w-180 h-full bg-gray-100'}>
                        <img loading={'lazy'} src={value.cover} className={'w-full h-full'}/>
                      </div>
                      <div className={'p-8'}>
                        <p
                          className={'text-28px select-none text-cblack hover:text-bang trans-motion'}>{value.title}</p>
                        <div className={'text-cfgray text-base select-none mt-6 w-96'}>
                          {value.description}</div>
                        <div
                          className={'flex items-center w-max absolute bottom-8 cursor-pointer select-none group hover:text-bang'}>
                          <span>查看详情</span>
                          <div className={'group-hover:ml-2 trans-motion'}><RightSvg/></div>
                        </div>
                      </div>
                    </div>
                  </a>
                </SwiperSlide>
              )}
            </Swiper>
            <RightArrow onClick={() => {
              solSwiperIns.current.slideNext()
            }}/>
          </div>
        </div>

        {/*news***************************************/}
        <div style={{height: '50rem'}} className={cn(basicSize, 'bg-white relative flex justify-center items-center')}>
          <div className={'absolute left-90 top-20'}>
            <p className={'font-bold text-title text-cblack select-none'}>新闻动态</p>
          </div>
          <Link href={'/news/industry' + process.env.NEXT_PUBLIC_SUFFIX_HTML}>
            <div
              className={'absolute right-90 top-25 z-40'}>
              <CustomButton
                onClick={()=>{}}
                style={{border: '1px solid #DADDE6', width: '8.25rem', height: '3rem'}}
                className={'text-cfgray select-none cursor-pointer rounded hover:text-white trans-motion flex-center justify-center'}>
                更多动态
              </CustomButton>
            </div>
          </Link>
          <div style={{width: '87rem'}} className={'flex justify-between items-center mt-20'}>
            <LeftArrow onClick={() => {
              newsSwiperIns.current.slidePrev()
            }}/>
            <Swiper allowTouchMove={false} updateOnWindowResize loop={true} spaceBetween={30}
                    style={{width: '79rem'}}
                    className={'news-container'}>
              {news && news.map((value, index) =>
                <SwiperSlide key={index} className={'flex justify-between relative z-10'}>
                  {value.map(article => <NewsItem key={article.id} data={article}/>)}
                </SwiperSlide>
              )}
            </Swiper>
            <RightArrow onClick={() => {
              newsSwiperIns.current.slideNext()
            }}/>
          </div>
        </div>
      </Layout>
    </>
  )
}

const advan = [
  {
    id: 0,
    title: '服务外包',
    list: ['使企业专注核心业务', '降低企业用工风险', '减少人员管理成本'],
    numImg: '/img/01.png',
    coverImg: '/img/cover-01.png'
  },
  {
    id: 1,
    title: '灵活用工',
    list: ['灵活用工需求，弹性配置人员', '满足生产波峰波谷用工需求', '突破组织人员编制的闲置'],
    numImg: '/img/02.png',
    coverImg: '/img/cover-02.png'
  },
  {
    id: 2,
    title: '税务筹划',
    list: ['定制税务筹划方案', '享受税收政策返还', '减免税收等优惠'],
    numImg: '/img/03.png',
    coverImg: '/img/cover-03.png'
  }
]

const RightArrow = (props: IArrowProps) => {
  const {more = true, className, onClick} = props;
  return (
    <svg onClick={() => {
      onClick?.();
    }}
         className={cn(!more ? 'text-gray-400' : 'text-cblack', 'cursor-pointer h-16 w-16', className)}
         width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g id="首页" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-1600.000000, -3755.000000)" id="编组">
          <g
            transform="translate(1624.000000, 3779.000000) scale(-1, 1) translate(-1624.000000, -3779.000000) translate(1600.000000, 3755.000000)">
            <rect id="矩形" fillOpacity="0.01" fill="#FFFFFF" fillRule="nonzero" x="0" y="0" width="48"
                  height="48"/>
            <polyline id="路径" stroke="#262A33" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                      points="31 36 19 24 31 12"/>
          </g>
        </g>
      </g>
    </svg>
  )
}

const LeftArrow = (props: IArrowProps) => {
  const {more = true, className, onClick} = props;
  return (
    <svg onClick={() => {
      onClick?.();
    }}
         className={cn(!more ? 'text-gray-400' : 'text-cblack', 'cursor-pointer h-16 w-16 transform rotate-180', className)}
         width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g id="首页" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-1600.000000, -3755.000000)" id="编组">
          <g
            transform="translate(1624.000000, 3779.000000) scale(-1, 1) translate(-1624.000000, -3779.000000) translate(1600.000000, 3755.000000)">
            <rect id="矩形" fillOpacity="0.01" fill="#FFFFFF" fillRule="nonzero" x="0" y="0" width="48"
                  height="48"/>
            <polyline id="路径" stroke="#262A33" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                      points="31 36 19 24 31 12"/>
          </g>
        </g>
      </g>
    </svg>
  )
}

const NewsItem = (props: { data: Article }) => {
  const {data} = props;
  const maxLength = 25;
  let title = data.title;
  if (title.length > maxLength) {
    title = title.slice(0, maxLength) + '...';
  }
  return (
    <div style={{width: '27.75rem', height: '29.5rem'}} className={'flex-center justify-center z-40 relative'}>
      <a
        href={process.env.NEXT_PUBLIC_NEW_PAGE + '/news/detail' + process.env.NEXT_PUBLIC_SUFFIX_HTML + '?id=' + data.id}
        target={'_blank'}
        rel={"noreferrer"}>
        <div style={{width: '23.75rem', height: '25.5rem'}}
          // className={'trans-motion cursor-pointer rounded-lg overflow-hidden hover:bg-gray-300 hover:bg-opacity-30'}>
             className={'trans-motion cursor-pointer rounded-lg overflow-hidden hover:shadow-swiper'}>
          <div style={{width: '23.75rem', height: '13.375rem'}} className={'bg-gray-100'}>
            <img loading={'lazy'} draggable={false} src={data.cover} className={'w-full h-full'}/>
          </div>
          <div style={{height: '12.125rem'}} className={'flex flex-wrap px-8 pt-8 pb-3'}>
            <h1 className={'text-2xl font-medium hover:text-bang trans-motion select-none'}>{title}</h1>
            <div className={'flex items-center justify-between w-full text-cfgray'}>
              <p className={'items-end text-xl select-none'}>{data.type}</p>
              <p className={'select-none'}>{data.publicAt}</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}