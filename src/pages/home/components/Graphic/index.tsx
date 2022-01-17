/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-11 18:19:11
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-17 17:33:25
 */
import React, { useState, useEffect } from 'react';
import { useSize } from 'ahooks';
import CarouselCom from '@/components/CarouselCom';
import styles from './index.less';

const list = [
  {
    id: 1,
    title: '标题',
    desc: '这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一',
    timeStr: '2022/01/01',
    img: 'https://wp-1302605407.cos.ap-beijing.myqcloud.com/img%2F%E4%BA%8C%E6%AC%A1%E5%85%83%E5%8A%A8%E6%BC%AB%E5%9B%BE%E5%BA%93%2F%E8%A8%80%E3%81%AE%E8%91%89%E3%81%AE%E5%BA%AD%2F00.PNG',
    classify: '励志',
    classifyId: '1',
  },
  {
    id: 2,
    title: '标题',
    desc: '这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息',
    timeStr: '2022/01/01',
    img: 'https://wp-1302605407.cos.ap-beijing.myqcloud.com/img%2F%E4%BA%8C%E6%AC%A1%E5%85%83%E5%8A%A8%E6%BC%AB%E5%9B%BE%E5%BA%93%2F%E8%A8%80%E3%81%AE%E8%91%89%E3%81%AE%E5%BA%AD%2F001.PNG',
    classify: '励志',
    classifyId: '1',
  },
  {
    id: 3,
    title: '标题',
    desc: '这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息',
    timeStr: '2022/01/01',
    img: 'https://wp-1302605407.cos.ap-beijing.myqcloud.com/img%2F%E4%BA%8C%E6%AC%A1%E5%85%83%E5%8A%A8%E6%BC%AB%E5%9B%BE%E5%BA%93%2F%E4%BA%91%E3%81%AE%E3%82%80%E3%81%93%E3%81%86%E7%BA%A6%E6%9D%9F%E3%81%AE%E5%9C%BA%E6%89%80%2F%E6%97%A0%E5%AD%97%E5%A3%81%E7%BA%B8%2F09.jpg',
    classify: '励志',
    classifyId: '1',
  },
  {
    id: 4,
    title: '标题',
    desc: '这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息这是一段文字信息',
    timeStr: '2022/01/01',
    img: 'https://wp-1302605407.cos.ap-beijing.myqcloud.com/img%2F%E4%BA%8C%E6%AC%A1%E5%85%83%E5%8A%A8%E6%BC%AB%E5%9B%BE%E5%BA%93%2F%E4%BA%91%E3%81%AE%E3%82%80%E3%81%93%E3%81%86%E7%BA%A6%E6%9D%9F%E3%81%AE%E5%9C%BA%E6%89%80%2F%E6%97%A0%E5%AD%97%E5%A3%81%E7%BA%B8%2F00.jpg',
    classify: '励志',
    classifyId: '1',
  },
];

interface Item {
  id: number | string;
  title: string;
  desc: string;
  timeStr: string;
  img: string;
  classify: string;
  classifyId: string | number;
}

const Graphic = () => {
  // 样式类型
  const [classType, setClassType] = useState<number>(1);
  // 获取当前窗口大小
  const size = useSize(document.body);
  // 监听页面宽度，设置导航样式
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
        <div className={styles.carouselComItem_time}>{item.timeStr}</div>
        <div className={styles.carouselComItem_desc}>{item.desc}</div>
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
  return (
    <div className={styles.graphic}>
      <div className={styles.title}>朝花夕拾</div>
      <div className={styles.border} />
      <div className={classType ? styles.contentMobile : styles.content}>
        <CarouselCom
          config={{ autoplay: false, autoplaySpeed: 5000 }}
          list={list}
          renderItem={renderItem}
        />
      </div>
    </div>
  );
};

export default Graphic;
