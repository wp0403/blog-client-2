/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-11 18:19:11
 * @LastEditors: 王鹏
 * @LastEditTime: 2022-01-23 00:38:51
 */
import React, { useState, useEffect } from 'react';
import { useSize } from 'ahooks';
import { message } from 'antd';
import CarouselCom from '@/components/CarouselCom';
import api from '@/api';
import styles from './index.less';

const { home } = api;

interface Item {
  id: number | string;
  title: string;
  desc: string;
  time_str: string;
  last_edit_time: string;
  img: string;
  author: string;
  classify: string;
  classifyId: string | number;
}

const Graphic = () => {
  // 样式类型
  const [classType, setClassType] = useState<number>(1);
  // 轮播列表数据
  const [swiperList, setSwiperList] = useState<Item[]>([]);
  // 获取当前窗口大小
  const size = useSize(document.body);
  // 监听页面宽度，设置轮播盒子样式
  useEffect(() => {
    if (size?.width && size?.width < 700) {
      setClassType(1);
    }
    if (size?.width && size?.width >= 700) {
      setClassType(0);
    }
  }, [size?.width]);

  // 轮播渲染函数
  const renderItem = (item: Item) => {
    const flag = Math.random() >= 0.5;

    const imgBox = (item: Item) => (
      <div className={styles.carouselComItem_left}>
        <img src={item.img} alt="" />
      </div>
    );

    const txtBox = (item: Item) => (
      <div className={styles.carouselComItem_right}>
        <div className={styles.carouselComItem_title}>{item.title}</div>
        <div className={styles.carouselComItem_time}>{item.time_str}</div>
        <div className={styles.carouselComItem_desc}>
          <div className={styles.desc_content}>{item.desc}</div>
        </div>
      </div>
    );

    return (
      <div
        className={
          classType ? styles.carouselComItemMobile : styles.carouselComItem
        }
      >
        {flag ? (
          <>
            {imgBox(item)}
            {txtBox(item)}
          </>
        ) : (
          <>
            <>
              {txtBox(item)}
              {imgBox(item)}
            </>
          </>
        )}
      </div>
    );
  };

  // 获取轮播博文列表
  const getSwiperList = async () => {
    await home
      ._getSwiperBowenList()
      .then(({ data }) => {
        if (data.code === 200) {
          setSwiperList(data.data);
        }
      })
      .catch((e) => {
        message.error(e);
      });
  };

  // 初始化
  useEffect(() => {
    getSwiperList();

    return () => {
      setSwiperList([]);
    };
  }, []);

  return (
    <div className={styles.graphic}>
      <div className={styles.title}>朝花夕拾</div>
      <div className={styles.border} />
      <div className={classType ? styles.contentMobile : styles.content}>
        <CarouselCom
          config={{ autoplay: true, autoplaySpeed: 5000 }}
          list={swiperList}
          renderItem={renderItem}
        />
      </div>
    </div>
  );
};

export default Graphic;
