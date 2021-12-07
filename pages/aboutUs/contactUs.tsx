import styles from '../../styles/aboutUs.module.scss'
import {Http} from "../../utils/http";
import {useEffect, useState} from 'react'
import cn from "classnames";
import Layout from "../../components/layout/Layout";
import Head from "next/head";
import Link from 'next/link';
import {Banner, CommonSettings, ContactUs, SEO} from "../../utils/types";

export default function Contact() {
  const [contractData, setContractData] = useState({} as ContactUs)
  const [setting, setSetting] = useState({} as CommonSettings);
  const [banner, setBanner] = useState([] as Banner[]);
  const [seo, setSeo] = useState({} as SEO);

  useEffect(() => {
    Http.getCommonSettings('contact_us').then(({data: commonData}) => {
      const setting = commonData.setting;
      const banner = commonData.banner
      const SEO = commonData.seo;
      setSeo(SEO);
      setSetting(setting);
      setBanner(banner);
    });
    Http.getAboutUs().then(({data}) => {
      setContractData(data)
    })
  }, [])

  return (
    <Layout header={{y: 100}} footer={setting} seo={seo}>
      <Head>
        <title>
          关于邦乎
        </title>
      </Head>
      {/* banner图部分 */}
      <div className={styles.banner}>
        <img loading={'lazy'} className={'w-full h-full'}
             draggable={false}
             src={banner[0]?.imgUrl || ''}/>
        <div className={styles.bannerTitle}>
          <div className={styles.tit1}>关于邦乎</div>
          <div className={styles.tit2}>COMPANY INTRODUCTION</div>
        </div>
      </div>

      {/* tab条 */}
      <div className={styles.tabs}>
        <div className={styles.tab}>
          <Link href={"/aboutUs/companyProfile" + process.env.NEXT_PUBLIC_SUFFIX_HTML}>
            <span className={'hover:bg-tab rounded select-none cursor-pointer text-cblack trans-motion'}>公司介绍</span>
          </Link>
          <span
            className={cn(styles.active, 'rounded select-none cursor-pointer text-cblack trans-motion')}>联系我们</span>
        </div>
      </div>


      {/* 联系我们 */}

      <div className={styles.contractUsBox}>
        <div className={cn('select-none', styles.tit)}>联系我们</div>
        <div className={styles.contactDetails}>
          <div style={{width: '23.75rem', height: '100%', position: 'relative'}}>
            <div style={{width: '100%', height: '100%'}}><img loading={'lazy'} className={'w-full h-full'}
                                                              src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/contract.png'}/>
            </div>
            {/*<div style={{position: 'absolute', left: '2.5rem', top: '3.13rem'}}>*/}
            {/*  <div style={{*/}
            {/*    height: '3rem',*/}
            {/*    fontSize: "2rem",*/}
            {/*    fontFamily: 'OPPOSans-M, OPPOSans',*/}
            {/*    color: '#FFF',*/}
            {/*    lineHeight: '3rem',*/}
            {/*    marginBottom: '2.75rem',*/}
            {/*    userSelect: 'none'*/}
            {/*  }}>全国服务热线*/}
            {/*  </div>*/}
            {/*  <div style={{*/}
            {/*    height: '3rem',*/}
            {/*    fontSize: ' 2rem',*/}
            {/*    fontFamily: 'OPPOSans-B, OPPOSans',*/}
            {/*    color: '#FFF',*/}
            {/*    lineHeight: '3rem',*/}
            {/*    marginBottom: '0.75rem'*/}
            {/*  }}>{contractData?.hotline?.value}</div>*/}
            {/*  <div style={{*/}
            {/*    height: '2rem',*/}
            {/*    fontSize: '1.5rem',*/}
            {/*    fontFamily: 'OPPOSans-R, OPPOSans',*/}
            {/*    color: '#FFF',*/}
            {/*    lineHeight: '2rem'*/}
            {/*  }}>{contractData?.working_time?.value}</div>*/}
            {/*</div>*/}
          </div>
          <div className={styles.contractWays}>
            <div className={cn('flex-center justify-center', styles.contractWay)}>
              <img loading={'lazy'} className={'w-full h-full'} draggable={false}
                   style={{width: '3.44rem', height: '4.31rem'}}
                   src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/position.png'}/>
              <div className={cn('select-none mt-10', styles.w2)}>地 址</div>
              <div className={styles.w3}>{contractData?.address?.value}</div>
            </div>
            <div className={cn('flex-center justify-center', styles.contractWay)}>
              <img loading={'lazy'} className={'w-full h-full'} draggable={false}
                   style={{width: '4rem', height: '4.31rem'}}
                   src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/email.png'}/>
              <div className={cn('select-none mt-10', styles.w2)}>E-mail</div>
              <div className={styles.w3}>{contractData?.email?.value}</div>
            </div>
            <div className={cn('flex-center justify-center', styles.contractWay)}>
              <img loading={'lazy'} className={'w-full h-full'} draggable={false}
                   style={{width: '3.69rem', height: '4.31rem'}}
                   src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/QQ.png'}/>
              <div className={cn('select-none mt-10', styles.w2)}>Q Q</div>
              <div className={styles.w3}>{contractData?.qq?.value}</div>
            </div>
            <div className={cn('flex-center justify-center', styles.contractWay)}>
              <img loading={'lazy'} className={'w-full h-full'} draggable={false}
                   style={{width: '3.754rem', height: '4.38rem'}}
                   src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/contact_person.png'}/>
              <div className={cn('select-none mt-10', styles.w2)}>联系人</div>
              <div className={styles.w3}>{contractData?.contact?.value}&nbsp;{contractData?.link_phone?.value}</div>
            </div>
          </div>

        </div>
        <div className={styles.addressBg}><img loading={'lazy'} className={'w-full h-full'} draggable={false}
                                               src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/address.png'}/></div>
      </div>
    </Layout>

  )
}
