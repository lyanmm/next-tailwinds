import {CSSProperties, ReactNode} from "react";

// components props
export interface ILayoutProps {
  header: {
    y: number;
  }
  footer?: CommonSettings;
  partner?: PartnerLink[][];
  seo: SEO;
  num?: boolean;
  children?: ReactNode | undefined;
}

export interface IArrowProps {
  more?: boolean;
  className?: string | undefined;
  onClick?: () => void;
}

export interface ICustomButtonProps {
  className?: string | undefined;
  style?: CSSProperties | undefined;
  hoverColor?: string | undefined;
  onClick?: () => void;
  animate?: boolean;
  children: ReactNode;
}

export interface IDropDataItemProps extends DropDataItem {
  scrollTop: number;
  y: number;
}

// staticData

interface LinkData {
  text: string;
  url: string;
}

export interface DropDataItem extends LinkData {
  list?: LinkData[]
}

export type Menu = 'index' | 'server' | 'employment' |
  'taxation' | 'case' | 'news' | 'partner' | 'company' | 'contact_us';

export interface SEO {
  description: CommonSettingsItem;
  keyword: CommonSettingsItem;
  site_title: CommonSettingsItem;
  sitename: CommonSettingsItem;
}

interface CommonSettingsItem {
  key: string;
  name: string;
  value: string;
}

export interface CommonSettings {
  hotline: CommonSettingsItem;
  icp: CommonSettingsItem;
  mp_qr_code: CommonSettingsItem;
  working_time: CommonSettingsItem;
  address: CommonSettingsItem;
}

export interface Banner {
  imgUrl: string;
  linkUrl: string;
  name: string;
  position: number;
}

export interface Article {
  cover: string;
  id: number;
  publicAt: string;
  title: string;
  type: string;
  description: string;
}

export enum NEWS_TYPE {
  INDUSTRY = 1,
  COMPANY
}

// response
export interface BasicResponse {
  code: string;
  success: boolean;
  message: string;
}

export interface ArticleDetail {
  title: string;
  publicAt: string;
  description: string;
  content: string;
  viewNumber: number;
  prev: { id: number; title: string; };
  next: { id: number; title: string; };
}

export interface ContactUs {
  address: CommonSettingsItem;
  email: CommonSettingsItem;
  hotline: CommonSettingsItem;
  qq: CommonSettingsItem;
  contact: CommonSettingsItem;
  link_phone: CommonSettingsItem;
  working_time: CommonSettingsItem;
}

export interface PartnerLink {
  name: string;
  imgUrl: string;
  linkUrl: string;
}

export interface Pager {
  total: number;
  currentPage: string;
  totalPage: number;
  pageSize: string;
}