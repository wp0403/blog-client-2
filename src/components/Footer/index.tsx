/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-09 07:11:30
 * @LastEditors: WangPeng
 * @LastEditTime: 2021-12-27 15:02:53
 */
import React, { useState, useEffect } from 'react';
import { Carousel, message } from 'antd';
import api from '@/api';
import style from './index.less';

const { home } = api;

const Footer = () => {
  const [excerptList, setExcerptList] = useState([]); // 摘抄列表
  const [footerRouter, setFooterRouter] = useState([]); // 底部路由列表

  const setHomeFooter = async () => {
    let { data } = await home._getHomeFooter();

    if (data.code === 200) {
      let { excerpt, footerRouter } = data.data;
      setExcerptList(excerpt);
      setFooterRouter(footerRouter);
    } else {
      console.log(data.data);
      message.error(data.msg);
    }
  };

  useEffect(() => {
    setHomeFooter();
  }, []);

  return (
    <div className={style.footer}>
      <div className={style.content}>
        <div className={style.footer_carousel}>
          <Carousel autoplay dotPosition="left" dots={false}>
            {excerptList[0] &&
              excerptList?.map((item: any) => (
                <div key={item?.id} className={style.footer_carousel_item}>
                  {item?.text}
                </div>
              ))}
          </Carousel>
        </div>
        <div className={style.tags}>
          {footerRouter[0] &&
            footerRouter?.map((item: any) => (
              <a className={style.tagItem} key={item?.id} href={item?.path}>
                {item?.text}
              </a>
            ))}
        </div>
      </div>
      <div className={style.footer_bg} />
    </div>
  );
};

export default Footer;
