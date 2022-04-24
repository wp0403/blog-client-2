/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2022-04-24 20:58:58
 * @LastEditors: 王鹏
 * @LastEditTime: 2022-04-24 21:44:58
 */
import React, { useState, useEffect } from 'react';
import {} from 'ahooks';
import {
  setBg,
  layoutContent,
  bindHandleScroll,
  removeScroll,
} from '@/utils/utils';
import style from './index.less';

interface listItem {
  id: string | number;
  name: string;
  src: string;
  type: string;
}

const Sitemap = () => {
  const [list, setList] = useState<listItem[]>([]);

  // 初始化
  useEffect(() => {
    setBg(false);
    bindHandleScroll();

    return () => {
      removeScroll();
    };
  }, []);
  return (
    <div className={style.sitemap}>
      <div className={style.sitemap_header}>于风里读诗的站点地图</div>
      <div className={style.sitemap_main}>
        <div className={style.major}></div>
      </div>
      <div className={style.sitemap_footer}></div>
    </div>
  );
};

export default Sitemap;
