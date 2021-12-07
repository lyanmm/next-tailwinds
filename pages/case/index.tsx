import Head from "next/head";
import Layout from "../../components/layout/Layout";
import {Http} from "../../utils/http";
import CustomButton from "../../components/customButton/CustomButton";
import Link from "next/link";
import {Article, Banner, CommonSettings, SEO} from "../../utils/types";
import {useEffect, useState} from "react";
import cn from "classnames";

export default function Case() {
  const [setting, setSetting] = useState({} as CommonSettings);
  const [banner, setBanner] = useState([] as Banner[]);
  const [seo, setSeo] = useState({} as SEO);

  const [newsData, setNewsData] = useState([] as Article[]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [btnState, setBtnState] = useState({loading: false, show: true});

  useEffect(() => {
    Http.getCommonSettings("case").then(({data: commonData}) => {
      const banner = commonData.banner;
      const setting = commonData.setting;
      const SEO = commonData.seo;
      setSeo(SEO);
      setBanner(banner);
      setSetting(setting);
    });
  }, [])

  useEffect(() => {
    Http.getNewsData(page, 6, 3).then(({data: {result: newsData, pager: {total}}}) => {
      if (total !== 0) {
        setTotal(total);
        setNewsData(prevState => [...prevState, ...newsData]);
      } else {
        setBtnState(prevState => ({...prevState, show: false}));
      }
    });
  }, [page]);

  useEffect(() => {
    if (newsData.length !== 0 && (newsData.length >= total)) {
      setBtnState(prevState => ({...prevState, show: false}));
    }
  }, [newsData.length, total]);

  return (
    <Layout header={{y: 100}} footer={setting} seo={seo}>
      <Head>
        <title>行业案例</title>
      </Head>
      <div style={{height: '31.25rem'}} className={'w-full flex-center relative'}>
        <div className={'absolute w-full h-full z-0 top-0 left-0'}>
          <img loading={'lazy'}
            className={'w-full h-full object-cover'}
            draggable={false}
            src={banner[0]?.imgUrl || ''}/>
        </div>
        <div className={'w-300 h-full z-10'}>
          <main className={'mt-60'}>
            <h1 className={'font-bold text-white text-title select-none'}>行业案例</h1>
            <div className={'mt-3 text-white select-none leading-8'}>实力雄厚，在业界拥有良好口碑。
            </div>
          </main>
        </div>
      </div>

      <div className={'w-full flex-center'}>
        <main className={'w-300 flex-center mb-16'}>
          <h1 className={'font-bold text-cblack text-title select-none mt-30'}>精彩案例</h1>
          <h3 style={{color: '#737680'}} className={'font-medium text-xl select-none mt-3'}>GOOD CASE</h3>
          <div className={'grid grid-cols-3 mt-20 gap-8'}>
            {newsData.map(value => <CaseItem data={value} key={value.id}/>)}
          </div>
          <CustomButton
            onClick={() => {
              setPage(prevState => prevState + 1);
            }}
            className={cn(!btnState.show && 'hidden', 'w-50 h-16 bg-bang text-white text-2xl mt-20 mb-8')}>
            {btnState.loading ? '加载中' : '加载更多'}
          </CustomButton>
        </main>
      </div>
    </Layout>
  )
}

const CaseItem = (props: { data: Article }) => {
  const {data} = props;
  const maxLength = 33;
  let description = data.description;
  if (description.length > maxLength) {
    description = description.slice(0, maxLength) + '...';
  }
  return (
    <Link href={'/case/detail' + process.env.NEXT_PUBLIC_SUFFIX_HTML + '?id=' + data.id}>
      <div style={{height: '25rem', width: '23.75rem', borderRadius: '0.4rem'}}
           className={'bg-white mb-4 overflow-hidden cursor-pointer trans-motion group hover:shadow-cshadow'}>
        <div style={{width: '23.75rem', height: '13.375rem'}} className={'relative'}>
          <img loading={'lazy'} className={'w-full h-full'} draggable={false} src={data.cover} alt={'case-cover'}/>
        </div>
        <div className={'my-10 px-8'}>
          <h2 className={'text-cblack text-2xl select-none group-hover:text-bang truncate'}>{data.title}</h2>
          <div className={'text-cfgray my-5 select-none w-full h-16'}>{description}</div>
        </div>
      </div>
    </Link>
  )
}