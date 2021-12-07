import Head from "next/head";
import Layout from "../../components/layout/Layout";
import CustomButton from "../../components/customButton/CustomButton";
import cn from "classnames";
import {Http} from "../../utils/http";
import _ from "lodash";
import {Banner, CommonSettings, PartnerLink, SEO} from "../../utils/types";
import {useEffect, useState} from "react";

export default function Staff() {
  const [setting, setSetting] = useState({} as CommonSettings);
  const [banner, setBanner] = useState([] as Banner[]);
  const [seo, setSeo] = useState({} as SEO);
  const [links, setLinks] = useState([] as PartnerLink[][]);

  useEffect(() => {
    Http.getCommonSettings("employment").then(({data: commonData}) => {
      const banner = commonData.banner;
      const setting = commonData.setting;
      const SEO = commonData.seo;
      setSeo(SEO);
      setBanner(banner);
      setSetting(setting);
    });
    Http.getPartnerLinks().then(({data: {partner: links}}) => {
      setLinks(_.chunk(links, 2));
    });
  }, [])

  return (
    <Layout header={{y: 100}} partner={links} footer={setting} seo={seo}>
      <Head>
        <title>灵活用工</title>
      </Head>
      <div style={{height: '43.75rem'}} className={'w-full flex-center relative'}>
        <img loading={'lazy'}
          // className={'absolute w-full h-full z-0 top-0 left-0'}
          style={{position: "absolute", width: '100%', height: '100%', zIndex: 0, top: 0, left: 0}}
          draggable={false}
          // src={banner[0]?.imgUrl || ''}
             src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/service-banner.jpg'}
        />
        <div className={'w-300 h-full z-10 flex justify-between'}>
          <main className={'mt-44'}>
            <h1 className={'font-bold text-white text-title select-none'}>关于灵活用工</h1>
            <div style={{color: '#BAD5FF'}}
                 className={'w-150 mt-11 select-none leading-8'}>帮助人才与企业合法合规共享对接，实现企业人事瘦身化、事务减少化、风险弱小化、成本最优化。
            </div>
            <CustomButton
              className={'w-50 hover:text-white trans-motion h-16 bg-white text-bang text-2xl mt-28'}>立即咨询</CustomButton>
          </main>
          <div style={{width: '24.25rem', height: '25.44rem'}}
               className={'mt-44 relative'}>
            <img loading={'lazy'} draggable={false} src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/staff-banner.png'}
                 alt={'staff-banner'} className={'w-full h-full'}/>
          </div>
        </div>
      </div>

      <div className={'w-full flex-center pb-24'}>
        <main className={'w-300 flex-center'}>
          <h1 className={'font-bold text-cblack text-title select-none mt-28'}>应用场景</h1>
          <div className={'grid grid-cols-2 mt-20 pb-8'}>
            {sceneData.map((value, index) =>
              <div key={value.id} className={value.border}>
                <div
                  className={cn('w-150 h-60 flex items-center hover:bg-white rounded-lg p-10 hover:shadow-2xl trans-motion')}>
                  <div className={'rounded-full flex-center justify-center'}
                       style={{backgroundColor: '#EEF4FE', width: '6.75rem', height: '6.75rem'}}>
                    <img loading={'lazy'} alt={'staff-scene'} draggable={false}
                         style={{width: value.imgWidth, height: value.imgHeight}}
                         src={process.env.NEXT_PUBLIC_PREFIX_IMG + `/img/staff-scene-${value.id + 1}.png`}/>
                  </div>
                  <ul className={'list-outside list-disc ml-18'}>
                    <li className={'text-cblack mt-4 select-none text-2xl font-medium'}
                    >{value.sub1}</li>
                    <li style={value.sub2Width && {width: value.sub2Width}}
                        className={'text-cblack select-none text-2xl font-medium mt-4'}
                    >{value.sub2}</li>
                  </ul>
                </div>
              </div>)}
          </div>
        </main>
      </div>

      <div style={{backgroundColor: '#f0f2f5'}} className={'w-full flex-center pb-30'}>
        <h1 className={'font-bold text-cblack text-title select-none mt-28'}>服务流程</h1>
        <div className={'w-max h-auto mt-30 relative'} style={{height: '16.5rem', width: '84.3rem'}}>
          <img loading={'lazy'} draggable={false} alt={'staff-flow'} src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/staff-flow.png'}
               className={'w-full h-full'}/>
        </div>
        <h3 className={'text-28px text-cblack mt-20 select-none'}>灵活用工平台</h3>
        <p className={'text-cfgray mt-2 pb-8 select-none'}>线上结算佣金，实时到账，正规备案，合规用工，完税发票</p>
        <CustomButton>立即咨询</CustomButton>
      </div>

    </Layout>
  )
}


const sceneData = [
  {
    id: 0,
    sub1: '编制不足',
    sub2: '限制业务发展',
    border: cn('border-b border-r border-border'),
    imgWidth: '4rem',
    imgHeight: '4rem',
  }, {
    id: 1,
    sub1: '用工需求阶段波动',
    sub2: '全职雇佣成本高',
    border: cn('border-b border-border'),
    imgWidth: '4rem',
    imgHeight: '4rem',
  }, {
    id: 2,
    sub1: '非核心岗位流动频繁',
    sub2: '招聘重复、管理效率低',
    border: cn('border-r border-border'),
    imgWidth: '3.25rem',
    imgHeight: '4rem',
  }, {
    id: 3,
    sub1: '多样化用工方式',
    sub2: '寻求多样化用工方式，聚焦核心专业服务',
    sub2Width: '21rem',
    imgWidth: '4.5rem',
    imgHeight: '4.5rem',
  },
]