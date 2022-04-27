/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2022-04-24 20:58:58
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-04-27 23:39:57
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
        <div className={style.sitemap_main_item}>
          <div className={style.sitemap_title}>一级页面</div>
          <div className={style.sitemap_body}>
            <a target="_blank" href="https://www.wp-boke.work/home">
              首页
            </a>
            <a target="_blank" href="https://www.wp-boke.work/classify">
              分类
            </a>
            {/* <a target="_blank" href="https://www.wp-boke.work/projectLibrary">
              项目库
            </a> */}
            <a target="_blank" href="https://www.wp-boke.work/itinerary">
              旅行日记
            </a>
            <a target="_blank" href="https://www.wp-boke.work/secret">
              树洞先生
            </a>
            {/* <a target="_blank" href="https://www.wp-boke.work/timeAxis">
              时间轴
            </a> */}
            <a target="_blank" href="https://www.wp-boke.work/about">
              关于
            </a>
            <a target="_blank" href="https://www.wp-boke.work/sitemap">
              站点地图
            </a>
          </div>
        </div>
      </div>
      <div className={style.sitemap_footer}></div>
    </div>
  );
};

export default Sitemap;
