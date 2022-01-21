/*
 * @Descripttion: 全局页面资源存储
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-18 11:05:40
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-21 15:04:43
 */
import api from '@/api';

const { all } = api;

export interface UserDate {
  id: string;
  bokePath: string;
  userName: string;
  title: string;
  desc: string;
  qq: string;
  weixin: string;
  email: string;
  about: string;
  aboutTags: string;
  secret_guide: string;
}

// 全局博主信息储存
let globalUserDate: UserDate | null = {} as UserDate;

// 设置博主信息缓存
export const setGlobalUserDate = (globalUserDate: UserDate | null) => {
  sessionStorage.setItem('userDate', JSON.stringify(globalUserDate));
};

// 获取博主信息缓存
export const getGlobalUserData = (): UserDate | null => {
  const str = sessionStorage.getItem('userDate');
  if (str) {
    globalUserDate = JSON.parse(str);
  } else {
    globalUserDate = null;
  }
  return globalUserDate;
};

// 判断是否需要重新获取
export const isFlagGetGlobalData = () => {
  const list = [getGlobalUserData()];

  return list.every((item) => item);
};

// 初始化获取全局资源
export const initGlobalData = async (obj) => {
  const { id = null } = obj;
  await all._getUserData({ params: { id } }).then((res) => {
    if (res.data.code === 200) {
      globalUserDate = res.data?.data;
    }
    setGlobalUserDate(globalUserDate);
  });
};
