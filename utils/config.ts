import {DropDataItem} from "./types";

const SUFFIX_HTML = process.env.NEXT_PUBLIC_SUFFIX_HTML;
export const dropData: DropDataItem[] = [
  {
    text: '首页',
    url: '/'
  }, {
    text: '产品服务',
    url: '/service',
    list: [
      {text: '服务外包', url: '/bpo' + SUFFIX_HTML},
      {text: '灵活用工', url: '/staff' + SUFFIX_HTML},
      {text: '税务筹划', url: '/taxation' + SUFFIX_HTML}
    ]
  }, {
    text: '行业案例',
    url: '/case' + SUFFIX_HTML,
  }, {
    text: '新闻动态',
    url: '/news',
    list: [
      {text: '行业动态', url: '/industry' + SUFFIX_HTML},
      {text: '公司动态', url: '/company' + SUFFIX_HTML},
    ]
  }, {
    text: '合伙人计划',
    url: '/partner' + SUFFIX_HTML,

  }, {
    text: '关于邦乎',
    url: '/aboutUs',
    list: [
      {text: '公司介绍', url: '/companyProfile' + SUFFIX_HTML},
      {text: '联系我们', url: '/contactUs' + SUFFIX_HTML},
    ]
  }
]

export const linksData = [{
  title: '产品服务',
  url: '/service',
  list: [{text: '服务外包', url: '/bpo' + SUFFIX_HTML},
    {text: '灵活用工', url: '/staff' + SUFFIX_HTML},
    {text: '税务筹划', url: '/taxation' + SUFFIX_HTML}]
}, {
  title: '新闻动态',
  url: '/news',
  list: [
    {text: '行业动态', url: '/industry' + SUFFIX_HTML},
    {text: '公司动态', url: '/company' + SUFFIX_HTML},
  ]
}, {
  title: '关于邦乎',
  url: '/aboutUs',
  list: [
    {text: '公司介绍', url: '/companyProfile' + SUFFIX_HTML},
    {text: '联系我们', url: '/contactUs' + SUFFIX_HTML},
  ]
}]