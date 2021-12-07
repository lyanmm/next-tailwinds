import Layout from "../../components/layout/Layout";
import {Http} from "../../utils/http";
import Head from "next/head";
import {useEffect, useState} from "react";
import _ from "lodash";
import {ArticleDetail, CommonSettings, SEO} from "../../utils/types";

export default function CaseDetail() {
  const [setting, setSetting] = useState({} as CommonSettings);
  const [article, setArticle] = useState({} as ArticleDetail);
  const [seo, setSeo] = useState({} as SEO);

  useEffect(() => {
    Http.getCommonSettings("case").then(({data: commonData}) => {
      const setting = commonData.setting;
      const SEO = commonData.seo;
      setSeo(SEO);
      setSetting(setting);
    });
  }, [])
  useEffect(() => {
    const id: any = location.search.split('=')[1];
    Http.getArticleDetail(id).then(({data}) => {
      setArticle(data);
    });
  }, []);
  useEffect(() => {
    const imgArr = _.slice(document.getElementsByTagName("img"), 1, document.getElementsByTagName("img").length - 1);
    imgArr.forEach(value => value.style.display = 'inline-block');
  })

  return (
    // TODO:找不到详细文章的404提示
    <Layout header={{y: 0}} footer={setting} seo={seo}>
      <Head>
        <title>{article && article.title}</title>
      </Head>
      <div className={'min-h-screen pt-20 w-300 ml-90 pb-24 flex-center'}>
        <h1 className={'text-cblack text-5xl mt-30'}>{article && article.title}</h1>
        {/*<h3 className={'text-cfgray mt-6'}>发布时间：{article && article.publicAt}</h3>*/}
        {/*<h3 className={'text-cfgray mt-6'}>作者：{article.author}</h3>*/}
        <div style={{width: '100%', backgroundColor: '#E9EBEE', height: 1}} className={'mt-8'}/>
        {article &&
        <div className={'article mt-8 w-300 text-cfgray'} dangerouslySetInnerHTML={{__html: article.content}}/>}
      </div>
    </Layout>
  )
}

