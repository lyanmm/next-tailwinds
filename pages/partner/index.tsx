import styles from '../../styles/partner.module.scss'
import {Http} from "../../utils/http";
import Layout from "../../components/layout/Layout";
import Head from "next/head";
import cn from "classnames";
import CustomButton from "../../components/customButton/CustomButton";
import {useEffect, useState} from 'react'

export default function Partner() {

  const [banner, setBanner] = useState([{imgUrl: '', linkUrl: '', name: '', position: 0}]);
  const [setting, setSetting] = useState({} as any);
  const [seo, setSeo] = useState({} as any);


  useEffect(() => {
    Http.getCommonSettings("partner").then(({data: commonData}) => {
      const banner = commonData.banner;
      const setting = commonData.setting;
      const SEO = commonData.seo;
      setSeo(SEO);
      setBanner(banner);
      setSetting(setting);
    });
  }, [])

  return (
    <Layout header={{y: 100}} footer={setting} seo={seo}>
      <Head>
        <title>
          合伙人计划
        </title>
      </Head>

      <div className={styles.banner}>
        <img loading={'lazy'}
          className={'w-full h-full object-cover'}
          draggable={false}
          alt="service-banner"
          src={banner[0]?.imgUrl || ''}/>

        <div className={styles.bannerTxt}>
          <div className={cn(styles.tit, 'select-none')}>邦乎合伙人招募计划</div>
          <div className={cn(styles.tip, 'select-none')}>携手开启财富机会</div>
          <div style={{width: '25rem', height: '4rem'}}
               className={'flex-center justify-center rounded-lg border-white border-2 text-white text-2xl font-medium'}>
            咨询热线：李先生 13560131640
          </div>
        </div>
      </div>

      <div className={styles.introduce}>
        <div className={cn(styles.tit, 'font-bold select-none')}>企业财税行业 蕴藏巨大商机</div>
        <div className={styles.box}>
          <div style={{width: '17rem', height: '23.75rem', backgroundColor: '#fff'}}
               className={'flex-center justify-between py-10 rounded-lg hover:shadow-xl trans-motion'}>
            <img loading={'lazy'} className={'w-full h-full'} style={{width: '5.25rem', height: '6.81rem'}} draggable={false}
                 src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/Wallet.png'}/>
            <div className={'text-cblack text-2xl font-medium select-none'}>金税三期</div>
            <div className={'text-center select-none text-cfgray'}>金税三期使社会即将进入<br/>人人纳税阶段，企业涉税<br/>需求井喷</div>
          </div>

          <div style={{width: '17rem', height: '23.75rem', backgroundColor: '#fff'}}
               className={'flex-center justify-between py-10 rounded-lg hover:shadow-xl trans-motion'}>
            <img loading={'lazy'} className={'w-full h-full'} style={{width: '6.94rem', height: '7.25rem'}} draggable={false}
                 src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/Lamp.png'}/>
            <div className={'text-cblack text-2xl font-medium select-none'}>“双创”影响</div>
            <div className={'text-center  select-none text-cfgray'}>大众创业，万众创新，新办<br/>企业数量高速增长，极大推<br/>动灵活用工的发展</div>
          </div>

          <div style={{width: '17rem', height: '23.75rem', backgroundColor: '#fff'}}
               className={'flex-center justify-between py-10 rounded-lg hover:shadow-xl trans-motion'}>
            <img loading={'lazy'} className={'w-full h-full'} draggable={false} style={{width: '7rem', height: '7rem'}}
                 src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/network_security.png'}/>
            <div className={'text-cblack text-2xl font-medium select-none'}>“互联网+”</div>
            <div className={'text-center  select-none text-cfgray'}>互联网开始深刻改变本地企<br/>业服务，拥抱互联网，才能<br/>拥抱未来</div>
          </div>

          <div style={{width: '17rem', height: '23.75rem', backgroundColor: '#fff'}}
               className={'flex-center justify-between py-10 rounded-lg hover:shadow-xl trans-motion'}>
            <img loading={'lazy'} className={'w-full h-full'} style={{width: '4.5rem', height: '7.25rem'}} draggable={false}
                 src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/Rocket.png'}/>
            <div className={'text-cblack text-2xl font-medium select-none'}>管理升级</div>
            <div className={'text-center  select-none text-cfgray'}>企业财税服务即将进入第二<br/>阶段，管理和效率落后的企<br/>业将被逐步淘汰</div>
          </div>

        </div>
      </div>

      <div className={'w-full'} style={{backgroundColor: '#F0F2F5'}}>
        <div className={'w-300 ml-90 flex-center pt-30'}>
          <h1 className={'font-bold text-cblack text-title select-none mr-12'}>成为合伙人您将获得</h1>
          <div className={'w-full flex justify-between mt-20'}>
            <div style={{height: '43rem'}} className={'flex flex-col justify-between'}>
              {gainData.map(value =>
                <div key={value.id} style={{width: '40rem', height: '10.75rem'}}
                     className={'flex items-center rounded-lg px-5 py-4 hover:bg-white hover:shadow-xl trans-motion'}>
                  <div style={{width: '6.75rem', height: '6.75rem', backgroundColor: '#EEF4FE', borderRadius: '50%'}}
                       className={'flex justify-center items-center'}>
                    <img loading={'lazy'} style={{width: value.imgWidth, height: value.imgHeight}} draggable={false}
                         src={process.env.NEXT_PUBLIC_PREFIX_IMG + value.img} alt={'partner-icon'}/>
                  </div>
                  <div style={{height: '5.5rem'}} className={'flex flex-col justify-between ml-10'}>
                    <h3 className={'text-2xl font-medium text-cblack select-none'}>{value.title}</h3>
                    <p className={'text-cfgray select-none'}>{value.sub}</p>
                  </div>
                </div>)}
            </div>
            <div className={'mr-5'}>
              <img loading={'lazy'} className={'w-full h-full'} style={{width: '31.25rem', height: '43rem'}} draggable={false}
                   src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/partner.png'}/>
            </div>
          </div>
          <CustomButton className={'text-white w-50 h-16 bg-bang text-2xl mt-20 mb-28'}>立即咨询</CustomButton>
        </div>
      </div>


      <div className={styles.condition}>
        <div className={cn(styles['condition-tit'], 'select-none')}>成为合伙人条件</div>
        <div className={styles.condition_leftPic}>
          <img loading={'lazy'} className={'w-full h-full'} draggable={false}
               src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/condition_left.png'}/>
        </div>
        <div className={styles.condition_rightPic}>
          <img loading={'lazy'} className={'w-full h-full'} draggable={false}
               src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/condition_right.png'}/>
        </div>

        <div className={styles.conditionBox}>

          <div className={styles.conditionItem}>
            <div className={styles.benefitPic}><img loading={'lazy'} className={'w-full h-full'} draggable={false}
                                                    src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/benefit1.png'}/>
            </div>
            <div className={styles.txt}>
              <div>认同并遵守邦乎</div>
              <div>《合伙人服务协议》</div>
            </div>
          </div>
          <div className={styles.conditionItem}>
            <div className={styles.benefitPic}><img loading={'lazy'} className={'w-full h-full'} draggable={false}
                                                    src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/benefit2.png'}/>
            </div>
            <div className={styles.txt}>
              <div>有丰富的企业资源</div>
              <div>能引荐介绍关键角色</div>
            </div>
          </div>
          <div className={styles.conditionItem}>
            <div className={styles.benefitPic}><img loading={'lazy'} className={'w-full h-full'} draggable={false}
                                                    src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/benefit3.png'}/>
            </div>
            <div className={styles.txt}>
              <div>勇于挑战</div>
              <div>愿意投身灵活用工行业</div>
            </div>
          </div>
        </div>
      </div>


      <div className={styles.process}>
        <div className={cn('select-none', styles.processTit)}>合伙流程</div>
        <div className={styles.processPic}><img loading={'lazy'} className={'w-full h-full'} draggable={false}
                                                src={process.env.NEXT_PUBLIC_PREFIX_IMG + '/img/process.png'}/>
        </div>
      </div>


    </Layout>

  )
}
const gainData = [
  {
    id: 0,
    title: '服务支持',
    sub: '专属服务经理，合作全程一对一提供业务及商务支持',
    img: '/img/service_support.png',
    imgWidth: '4.38rem',
    imgHeight: '4.38rem',
  }, {
    id: 1,
    title: '专业支持',
    sub: '20年行业专家/资深顾问保驾护航，实现高效成单',
    img: '/img/professional_support.png',
    imgWidth: '4.5rem',
    imgHeight: '4.5rem',
  }, {
    id: 2,
    title: '产品支持',
    sub: '强大的技术研发能力，产品稳定更新，高度迎合市场需求',
    img: '/img/product_support.png',
    imgWidth: '4.5rem',
    imgHeight: '4.5rem',
  }, {
    id: 3,
    title: '可持续收益',
    sub: '全套的服务体系，确保合作人快速开展业务，获得持续收益',
    img: '/img/sustainable_income.png',
    imgWidth: '3.63rem',
    imgHeight: '4rem',
  },
];