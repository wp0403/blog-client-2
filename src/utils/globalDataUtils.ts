/*
 * @Descripttion: 全局页面资源存储
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-18 11:05:40
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-11-04 17:49:50
 */
import api from '@/api';

const { all } = api;
interface UserSite {
  id: number;
  author_id: string;
  home_title: string;
  home_desc: string;
  home_about: string;
  personal_label: string;
  secret_guide: string;
  about_page: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  create_time: any;
  last_edit_time: any;
  state: number;
  role_id: number;
  qq: string;
  weixin: string;
  github: string;
  img: string;
  uid: string;
  siteInfo: UserSite;
}

interface Dict {
  bowen_class: any[];
  bowen_class_sub: any[];
  weather_list: any[];
  mood_list: any[];
  bowen_type: any[];
}

// 设置博主信息缓存
export const setGlobalUserDate = (globalUserDate: User | null) => {
  sessionStorage.setItem('userDate', JSON.stringify(globalUserDate));
};
// 设置字典信息缓存
export const setGlobalDict = (globalDictList: Dict | null) => {
  sessionStorage.setItem('dict', JSON.stringify(globalDictList));
};

// 获取博主信息缓存
export const getGlobalUserData = (): User | null => {
  return JSON.parse(sessionStorage.getItem('userDate') || '');
};
// 获取字典信息缓存
export const getGlobalDict = (): Dict | null => {
  return JSON.parse(sessionStorage.getItem('dict') || '');
};
// 根据type获取字典
export const getOnlyDictObj = (type: string): any[] | any => {
  let onlyDict: any = [];
  if (getGlobalDict()) {
    onlyDict = getGlobalDict()![type];
  } else {
    onlyDict = null;
  }
  return onlyDict;
};
// 根据type和id获取字典对象
export const getDictObj = (type: string, id: number): any[] | any => {
  let dictObj: any = {};
  if (getGlobalDict()) {
    dictObj = getGlobalDict()![type]?.find((v: any) => `${v.id}` === `${id}`);
  } else {
    dictObj = null;
  }
  return dictObj;
};

// 判断是否需要重新获取
export const isFlagGetGlobalData = () => {
  return sessionStorage.getItem('userDate') && sessionStorage.getItem('dict');
};

// 初始化获取全局资源
export const initGlobalData = async (obj: any) => {
  const { id = null, fun } = obj;
  await all._getUserDetails({ params: { id } }).then((res) => {
    if (res.data.code === 200) {
      setGlobalUserDate(res.data?.data);
    }
  });
  await all._getDictList().then((res) => {
    if (res.data.code === 200) {
      setGlobalDict(res.data.data);
    }
  });
  await fun(true);
};
