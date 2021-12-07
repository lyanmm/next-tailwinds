import styles from '../../styles/aboutUs.module.scss'
import {Http} from "../../utils/http";
import {useEffect, useState} from 'react'
import cn from "classnames";
import Layout from "../../components/layout/Layout";
import Head from "next/head";
import Link from 'next/link';
import {Nums} from "../../components/nums/Nums";
import {Banner, CommonSettings, SEO} from "../../utils/types";

export default function CompanyProfile() {
  const [introduceData, setIntroduceData] = useState([])
  const [setting, setSetting] = useState({} as CommonSettings);
  const [banner, setBanner] = useState([] as Banner[]);
  const [seo, setSeo] = useState({} as SEO);

  useEffect(() => {
    Http.getCommonSettings('company').then(({data: commonData}) => {
      const setting = commonData.setting;
      const banner = commonData.banner;
      const SEO = commonData.seo;
      setSeo(SEO);
      setSetting(setting);
      setBanner(banner);
    });
    Http.getCompanyIntroduce().then(({data}) => {
      setIntroduceData(() => data)
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
          <span className={cn(styles.active, 'rounded select-none cursor-pointer text-cblack trans-motion')}>公司介绍</span>
          <Link href={"/aboutUs/contactUs" + process.env.NEXT_PUBLIC_SUFFIX_HTML}>
            <span className={'hover:bg-tab rounded select-none cursor-pointer text-cblack trans-motion'}>联系我们</span>
          </Link>
        </div>
      </div>

      {/* 公司动态  */}

      <div className={styles.article}>
        <div className={cn('select-none', styles.tit)}>{introduceData[0]?.value}</div>
        <div className={'w-10 h-1 bg-bang my-10'}/>
        <div className={styles.p1}>{introduceData[1]?.value}</div>
      </div>
      <Nums/>
    </Layout>

  )
}
