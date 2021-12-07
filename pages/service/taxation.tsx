import Head from "next/head";
import Layout from "../../components/layout/Layout";
import CustomButton from "../../components/customButton/CustomButton";
import cn from "classnames";
import {Http} from "../../utils/http";
import {Banner, CommonSettings, PartnerLink, SEO} from "../../utils/types";
import _ from "lodash";
import {useEffect, useState} from "react";


export default function Taxation() {
  const [setting, setSetting] = useState({} as CommonSettings);
  const [banner, setBanner] = useState([] as Banner[]);
  const [seo, setSeo] = useState({} as SEO);
  const [links, setLinks] = useState([] as PartnerLink[][]);

  useEffect(() => {
    Http.getCommonSettings("taxation").then(({data: commonData}) => {
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
    <Layout header={{y: 200}} partner={links} footer={setting} seo={seo}>
      <Head>
        <title>税务筹划</title>
      </Head>

      <div style={{height: '43.75rem'}} className={'w-full flex-center relative'}>
        <img loading={'lazy'}
             draggable={false}
          // className={'absolute w-full h-full z-0 top-0 left-0'}
             style={{position: "absolute", width: '100%', height: '100%', zIndex: 0, top: 0, left: 0}}
          // src={banner[0]?.imgUrl || ''}
             src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/service-banner.jpg'}
        />
        <div className={'w-300 h-full z-10 flex justify-between'}>
          <main className={'mt-44'}>
            <h1 className={'font-bold text-white text-title select-none'}>关于税务筹划</h1>
            <div style={{color: '#BAD5FF'}}
                 className={'mt-11 select-none leading-8'}>薪酬专家，定制优化。为税务筹划落地提供灵活迁移保障，提高风险<br/>管控能力。
            </div>
            <CustomButton
              className={'w-50 h-16 bg-white text-bang hover:text-white trans-motion text-2xl mt-28'}>立即咨询</CustomButton>
          </main>
          <div style={{height: '28.4rem', width: '24rem'}}
               className={'mt-44'}>
            <img loading={'lazy'} className={'w-full h-full'} draggable={false}
                 src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/tax-banner.png'}/>
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
                       style={{width: '6.75rem', height: '6.75rem', backgroundColor: '#EEF4FE'}}>
                    <img loading={'lazy'} alt={'staff-scene'} draggable={false}
                         style={{width: value.imgWidth, height: value.imgHeight}}
                         src={process.env.NEXT_PUBLIC_PREFIX_IMG + `/img/tax-scene-${value.id + 1}.png`}/>
                  </div>
                  <ul className={'list-outside list-disc ml-18'}>
                    <li className={'text-cblack select-none text-2xl font-medium'}
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
        <h1 className={'font-bold text-cblack text-title select-none mt-28'}>税务筹划的好处</h1>
        <div style={{height: '32.5rem'}} className={'w-300 flex mt-20'}>
          <div style={{width: '43.875rem'}} className={'flex flex-col justify-between'}>

            <div style={{width: '41.875rem', height: '15rem'}}
                 className={'bg-white rounded-lg pl-12 shadow-lg flex items-center'}>
              <div style={{width: '6.75rem', height: '6.75rem', backgroundColor: '#EEF4FE'}}
                   className={'rounded-full flex-center justify-center'}>
                <img loading={'lazy'} alt={'staff-scene'} draggable={false}
                     src={process.env.NEXT_PUBLIC_PREFIX_IMG + `/img/tax-fun-1.png`}
                     style={{width: '3.44rem', height: '4rem'}}/>
              </div>
              <div className={'ml-12'}>
                <h4 className={'mt-10 text-cblack text-2xl font-medium select-none'}>减轻税收负担，规避税务风险</h4>
                <p className={'mt-7 text-cfgray pb-8 select-none w-96'}>纳税筹划使企业减少税额负担、减少税收比例、延缓纳税时间，实现经济利益最大化。<br/>在税法所允许的范围内进行，有效地规避了税务风险，实现税收零风险。
                </p>
              </div>
            </div>

            <div style={{width: '41.875rem', height: '15rem'}}
                 className={'bg-white rounded-lg pl-12 shadow-lg flex items-center'}>
              <div style={{width: '6.75rem', height: '6.75rem', backgroundColor: '#EEF4FE'}}
                   className={'rounded-full flex-center justify-center'}>
                <img loading={'lazy'} alt={'staff-scene'} draggable={false}
                     src={process.env.NEXT_PUBLIC_PREFIX_IMG + `/img/tax-fun-2.png`}
                     style={{width: '3.63rem', height: '4rem'}}/>
              </div>
              <div className="ml-12">
                <h4 className={'mt-10 text-cblack text-2xl font-medium select-none'}>提升企业经营管理水平</h4>
                <p
                  className={'mt-9 text-cfgray pb-8 select-none w-96'}>纳税筹划过程，需要对经济活动的各个方面内容进行事先科学安排，有助于企业经营管理水平的提高。</p>
              </div>
            </div>

          </div>

          <div style={{width: '31.25rem', height: '32.5rem'}}>
            <img loading={'lazy'} className={'w-full h-full'} draggable={false}
                 src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/tax-fun.png'} alt={'tax-fun'}/>
          </div>
        </div>
        <CustomButton className={'w-60 h-18 bg-bang text-white text-28px mt-20'}>咨询方案</CustomButton>
      </div>
    </Layout>
  )
}

const sceneData = [
  {
    id: 0,
    sub1: '不懂财税',
    sub2: '管理层不懂财税，业务过程浪费税',
    sub2Width: '18rem',
    border: cn('border-b border-r border-border'),
    imgWidth: '3.81rem',
    imgHeight: '4rem',
  }, {
    id: 1,
    sub1: '利益风险',
    sub2: '多交税没利润，少交税风险大',
    border: cn('border-b border-border'),
    imgWidth: '3.63rem',
    imgHeight: '4.13rem',
  }, {
    id: 2,
    sub1: '税务风险高',
    sub2: '因某些因素导致企业面临更多税务风险',
    sub2Width: '19.5rem',
    border: cn('border-r border-border'),
    imgWidth: '4.5rem',
    imgHeight: '4.5rem',
  }, {
    id: 3,
    sub1: '不懂最新政策',
    sub2: '政策了解不够，不能合理的节税',
    imgWidth: '4rem',
    imgHeight: '3.63rem',
  },
]