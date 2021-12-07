import axios from "axios";
import {
  Article,
  ArticleDetail,
  Banner,
  BasicResponse,
  CommonSettings, ContactUs,
  Menu, Pager,
  PartnerLink, SEO
} from "./types";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN_ENV,
  timeout: 10000
})

async function getCommonSettings(menu?: Menu): Promise<{
  data: { setting: CommonSettings, banner: Banner[], seo: SEO }
} & BasicResponse> {
  const response = await instance.get('/home/common/setting', {
    params: {
      menu
    }
  });
  return response.data;
}

async function getHomeData(): Promise<{
  data: { case: Article[], company: Article[], solution: Article[] }
} & BasicResponse> {
  const response = await instance.get('home/index/index')
  return response.data;
}

async function getCaseData(page: number): Promise<{
  data: { result: Article[], pager: Pager };
} & BasicResponse> {
  const response = await instance.get('/home/news/list', {
    params: {
      type: 3,
      page,
      pageSize: 6
    }
  });
  return response.data;
}

// 获取行业动态
async function getNewsData(page: number, pageSize: number, type: any): Promise<{
  data: { result: Article[], pager: Pager }
} & BasicResponse> {
  const response = await instance.get('/home/news/list', {
    params: {
      page,
      pageSize,
      type
    }
  });
  return response.data;
}

// 获取公司介绍
async function getCompanyIntroduce() {
  const response = await instance.get('/home/about/company');
  return response.data;
}

// 获取文章详情 
async function getNewsDetail(id: number) {
  const response = await instance.get('/home/news/detail', {
    params: {
      id
    }
  });
}

// 获取关于我们
async function getAboutUs(): Promise<BasicResponse & { data: ContactUs }> {
  const response = await instance.get('/home/about/contact');
  return response.data;
}

async function postConsultation(formData): Promise<BasicResponse> {
  const response = await instance.post('/home/consultation/create', formData);
  return response.data;
}

async function getPartnerLinks(): Promise<{ data: { partner: PartnerLink[] } } & BasicResponse> {
  const response = await instance.get('/home/common/partner');
  return response.data;
}

async function getArticleDetail(id: number): Promise<{
  data: ArticleDetail;
} & BasicResponse> {
  const response = await instance.get('/home/news/detail?id=' + id);
  return response.data;
}


export const Http = {
  getCommonSettings,
  getHomeData,
  getCaseData,
  getNewsData,
  getCompanyIntroduce,
  getAboutUs,
  postConsultation,
  getArticleDetail,
  getPartnerLinks
};
