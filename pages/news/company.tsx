import NewsBlock from "../../components/new/New"
import styles from '../../styles/news.module.scss'
import {useEffect, useRef, useState} from "react"
import cn from "classnames";
import Layout from "../../components/layout/Layout";
import {Http} from "../../utils/http";
import Head from "next/head";
import CustomButton from "../../components/customButton/CustomButton";
import Link from "next/link";
import {Banner, CommonSettings, SEO} from "../../utils/types";

export default function Company() {
  const [newsData, setNewsData] = useState([]);
  const [btnState, setBtnState] = useState({loading: false, show: true});
  const [page, setPage] = useState(3);
  const [total, setTotal] = useState(0);
  const initRef = useRef(true);

  const [setting, setSetting] = useState({} as CommonSettings);
  const [banner, setBanner] = useState([] as Banner[]);
  const [seo, setSeo] = useState({} as SEO);

  function setData(total, newsData) {
    if (total !== 0) {
      setTotal(total);
      setNewsData(prevState => [...prevState, ...newsData]);
    } else {
      setBtnState(prevState => ({...prevState, show: false}));
    }
  }

  // 初始化数据
  useEffect(() => {
    Http.getCommonSettings("news").then(({data: commonData}) => {
      const banner = commonData.banner;
      const setting = commonData.setting;
      const SEO = commonData.seo;
      setSeo(SEO);
      setBanner(banner);
      setSetting(setting);
    });
    Http.getNewsData(1, 6, 2).then(({data: {result: newsData, pager: {total}}}) => {
      setData(total, newsData);
    });
  }, []);

  // 更新数据
  useEffect(() => {
    if (!initRef.current) {
      Http.getNewsData(page, 2, 2).then(({data: {result: newsData, pager: {total}}}) => {
        setData(total, newsData);
      });
    } else {
      initRef.current = false;
    }
  }, [page]);

  useEffect(() => {
    if (newsData.length !== 0 && (newsData.length >= total)) {
      setBtnState(prevState => ({...prevState, show: false}));
    }
  }, [newsData.length, total]);

  return (
    <Layout header={{y: 100}} footer={setting} seo={seo}>
      <Head>
        <title>
          新闻动态-公司动态
        </title>
      </Head>
      {/* banner图部分 */}
      <div className={styles.banner}>
        <img loading={'lazy'}
             className={'w-full h-full'}
             draggable={false}
          // src={banner[0]?.imgUrl || ''}
             src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/news_banner.jpg'}
        />
        <div className={styles.bannerTitle}>
          <div className={styles.tit1}>新闻动态</div>
          <div className={styles.tit2}>我们每天为您创造新精彩</div>
        </div>
      </div>

      {/* tab条 */}
      <div className={styles.tabs}>
        <div className={styles.tab}>
          <Link href={"/news/industry" + process.env.NEXT_PUBLIC_SUFFIX_HTML}>
            <span className={'hover:bg-tab rounded select-none cursor-pointer text-cblack trans-motion'}>
              行业动态</span>
          </Link>
          <span className={cn(styles.active, 'rounded select-none cursor-pointer text-cblack trans-motion')}>
            公司动态</span>
        </div>
      </div>
      <div className={'mb-24'}>
        {newsData.map((item) => <NewsBlock {...item} key={item.id}/>)}
      </div>
      <CustomButton
        onClick={() => {
          setPage(prevPage => prevPage + 1);
        }}
        className={cn(btnState.show ? 'block' : 'hidden', 'mx-auto my-16 text-white w-50 h-16 bg-bang text-2xl')}>
        {btnState.loading ? '加载中' : '加载更多'}
      </CustomButton>
    </Layout>

  )
}

