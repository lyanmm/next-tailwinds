import Head from "next/head";
import Layout from "../../components/layout/Layout";
import CustomButton from "../../components/customButton/CustomButton";
import {Http} from "../../utils/http";
import _ from "lodash";
import {useEffect, useState} from "react";
import {Banner, CommonSettings, PartnerLink, SEO} from "../../utils/types";

export default function Bpo() {
  const [layoutSetting, setLayoutSetting] = useState({
    links: [],
    setting: {},
    seo: {}
  } as {
    links: PartnerLink[][],
    setting: CommonSettings,
    seo: SEO
  })
  const [banner, setBanner] = useState([] as Banner[]);

  useEffect(() => {
    Promise.all([Http.getCommonSettings("server"), Http.getPartnerLinks()]).then(value => {
      setLayoutSetting({
        links: _.chunk(value[1].data.partner, 2),
        setting: value[0].data.setting,
        seo: value[0].data.seo
      });
      setBanner(value[0].data.banner);
    })
  }, [])

  return (
    <Layout header={{y: 100}} partner={layoutSetting.links} footer={layoutSetting.setting} seo={layoutSetting.seo}>
      <Head>
        <title>服务外包</title>
      </Head>
      <div style={{height: '43.75rem'}} className={'w-full flex-center relative'}>
        {/*{banner.length !== 0 && <img loading={'lazy'}*/}
        {/*  id={'banner'}*/}
        {/*  // className={'absolute w-full h-full z-0 top-0 left-0'}*/}
        {/*  style={{position: "absolute", width: '100%', height: '100%', zIndex: 0, top: 0, left: 0}}*/}
        {/*  draggable={false}*/}
        {/*  src={banner[0]?.imgUrl || ''}*/}
        {/*/>}*/}

        <div className={'absolute w-full h-full z-0 top-0 left-0'}>
          <img loading={'lazy'}
               className={'w-full h-full object-cover'}
               draggable={false}
            // src={banner[0]?.imgUrl || ''}
               src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/service-banner.jpg'}
          />
        </div>
        <div className={'w-300 h-full z-10 flex justify-between'}>
          <main className={'mt-44'}>
            <h1 className={'font-bold text-white text-title select-none'}>关于服务外包</h1>
            <div style={{color: '#BAD5FF'}}
                 className={'w-150 mt-11 select-none leading-8'}>业务服务外包是指企业把一些重复性和非核心岗位的业务流程分离出去，外包公司通过专业的人员管理以及规范化的操作流程，简化企业的用工程序，减少人员管理的成本，降低企业的用工风险，提高企业管理效率。
            </div>
            <CustomButton
              className={'w-50 h-16 bg-white text-bang hover:text-white trans-motion text-2xl mt-28'}>立即咨询</CustomButton>
          </main>
          <div style={{width: '24.625rem', height: '26.625rem'}}
               className={'mt-48 relative'}>
            <img loading={'lazy'} className={'w-full h-full'}
                 draggable={false} src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/bpo-banner.png'} alt={'bpo-banner'}/>
          </div>
        </div>
      </div>


      <div className={'w-full flex-center'}>
        <main className={'w-300 flex-center'}>
          <h1 className={'font-bold text-cblack text-title select-none mt-28'}>解决难题</h1>
          <div className={'grid grid-cols-2 mt-20 gap-8 pb-8'}>
            {resolveData.map((value, index) =>
              <div key={value.id} style={{width: '35.625rem', height: '15rem'}}
                   className={'flex items-center bg-white rounded-lg p-9 hover:shadow-cshadow trans-motion'}>
                <img loading={'lazy'} draggable={false}
                     src={process.env.NEXT_PUBLIC_PREFIX_IMG + `/img/bpo-resolve-${value.id + 1}.png`}
                     style={{width: value.imgWidth, height: value.imgHeight}}/>
                <div className={'ml-8'}>
                  <h1 className={'text-cblack text-2xl font-medium select-none'}>{value.title}</h1>
                  <p className={'text-cfgray mt-4 select-none'}>{value.sub1}</p>
                  <p className={'text-cfgray mt-2 select-none'}>{value.sub2}</p>
                </div>
              </div>)}
          </div>
        </main>
      </div>


      <div className={'w-full flex-center pb-32'}>
        <main className={'w-300 flex-center'}>
          <h1 className={'font-bold text-cblack text-title select-none mt-30'}>服务外包方案</h1>
          <div className={'w-full flex justify-between mt-20'}>
            {caseData.map((value, index) =>
              <div key={value.id} style={{width: '23.75rem', height: '32rem'}}
                   className={'bg-white flex-center pt-10 rounded-md hover:shadow-cshadow trans-motion'}>
                <div className={'w-25 h-25 rounded-full flex-center justify-center'}
                     style={{backgroundColor: '#EEF4FE'}}>
                  <img loading={'lazy'} style={{width: value.imgWidth, height: value.imgHeight}} draggable={false}
                       src={process.env.NEXT_PUBLIC_PREFIX_IMG + `/img/bpo-case-${value.id + 1}.png`} alt={'case'}/>
                </div>
                <h3 className={'text-cblack text-2xl mt-10 select-none'}>{value.title}</h3>
                <p style={{width: value.desWidth}}
                   className={'text-cfgray text-center mt-7 pb-20 select-none'}>{value.des}</p>
                <CustomButton>立即咨询</CustomButton>
              </div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  )
}

const resolveData = [
  {
    id: 0,
    title: '01.编制预算严',
    sub1: '难点：人员编制申请难，工资总额预算刚性',
    sub2: '解决：选择第三方，破解刚性限制，弹性灵活',
    imgWidth: '6.81rem',
    imgHeight: '6.63rem',
  }, {
    id: 1,
    title: '02.用工风险高',
    sub1: '难点：用工波动，企业主体直接争议风险记录',
    sub2: '解决：主体隔离设计，专家团队防控处理解决',
    imgWidth: '6.63rem',
    imgHeight: '6.88rem',
  }, {
    id: 2,
    title: '03.编管理难度大',
    sub1: '难点：管理难度越来越大，组织臃肿分类复杂',
    sub2: '解决：适应共享服务外包趋势，轻化企业管理架构',
    imgWidth: '6.63rem',
    imgHeight: '6.63rem',
  }, {
    id: 3,
    title: '04.属地城市多',
    sub1: '难点：全国地域差异大，外派及属地管理难',
    sub2: '解决：借助第三方统一平台实时数字化落地直营服务',
    imgWidth: '7.69rem',
    imgHeight: '6.81rem',
  },
]

const caseData = [
  {
    id: 0,
    title: '灵活用工',
    des: '灵活用工，是指企业基于经营需要或业务需求，通过非全日制用工、劳务派遣、业务外包、平台型用工等多种...',
    desWidth: '19rem',
    imgWidth: '3.88rem',
    imgHeight: '3.88rem',
  }, {
    id: 1,
    title: '劳务派遣',
    des: '更针对中国企业用工特点和趋势的新型派遣灵活弹性便捷，三方和谐管理',
    desWidth: '12rem',
    imgWidth: '3.63rem',
    imgHeight: '3.81rem',
  }, {
    id: 2,
    title: '结算服务',
    des: '服务商，是指由当地政府和税局授权许可，可办理委托代征业务的企业。服务商管理...',
    desWidth: '14rem',
    imgWidth: '3.06rem',
    imgHeight: '4rem',
  },
]

