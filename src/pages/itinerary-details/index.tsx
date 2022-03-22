/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-03-10 18:03:32
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-03-22 15:03:29
 */
import React, { useEffect, useState } from 'react';
import { useSize } from 'ahooks';
import SysIcon from '@/components/SysIcon';
import { setBg, addLayoutNavStyle } from '@/utils/utils';
import CarouselCustom from '@/components/CarouselCustom';
import styles from './index.less';

const list = [
  {
    id: 1,
    imgs: [
      {
        id: 1,
        src: 'https://wp-1302605407.cos.ap-beijing.myqcloud.com/img%2F%E4%BA%8C%E6%AC%A1%E5%85%83%E5%8A%A8%E6%BC%AB%E5%9B%BE%E5%BA%93%2F%E7%A7%92%E9%80%9F5%E3%82%BB%E3%83%B3%E3%83%81%E3%83%A1%E3%83%BC%E3%83%88%E3%83%AB%2F%E7%A7%92%E9%80%9F5%E5%8E%98%E7%B1%B3%20(10).jpg',
      },
      {
        id: 2,
        src: 'https://wp-1302605407.cos.ap-beijing.myqcloud.com/img%2F%E4%BA%8C%E6%AC%A1%E5%85%83%E5%8A%A8%E6%BC%AB%E5%9B%BE%E5%BA%93%2F%E7%A7%92%E9%80%9F5%E3%82%BB%E3%83%B3%E3%83%81%E3%83%A1%E3%83%BC%E3%83%88%E3%83%AB%2F%E7%A7%92%E9%80%9F5%E5%8E%98%E7%B1%B3%20(100).jpg',
      },
      {
        id: 3,
        src: 'https://wp-1302605407.cos.ap-beijing.myqcloud.com/img%2F%E4%BA%8C%E6%AC%A1%E5%85%83%E5%8A%A8%E6%BC%AB%E5%9B%BE%E5%BA%93%2F%E7%A7%92%E9%80%9F5%E3%82%BB%E3%83%B3%E3%83%81%E3%83%A1%E3%83%BC%E3%83%88%E3%83%AB%2F%E7%A7%92%E9%80%9F5%E5%8E%98%E7%B1%B3%20(1000).jpg',
      },
      {
        id: 4,
        src: 'https://wp-1302605407.cos.ap-beijing.myqcloud.com/img%2F%E4%BA%8C%E6%AC%A1%E5%85%83%E5%8A%A8%E6%BC%AB%E5%9B%BE%E5%BA%93%2F%E7%A7%92%E9%80%9F5%E3%82%BB%E3%83%B3%E3%83%81%E3%83%A1%E3%83%BC%E3%83%88%E3%83%AB%2F%E7%A7%92%E9%80%9F5%E5%8E%98%E7%B1%B3%20(1001).jpg',
      },
      {
        id: 5,
        src: 'https://wp-1302605407.cos.ap-beijing.myqcloud.com/img%2F%E4%BA%8C%E6%AC%A1%E5%85%83%E5%8A%A8%E6%BC%AB%E5%9B%BE%E5%BA%93%2F%E7%A7%92%E9%80%9F5%E3%82%BB%E3%83%B3%E3%83%81%E3%83%A1%E3%83%BC%E3%83%88%E3%83%AB%2F%E7%A7%92%E9%80%9F5%E5%8E%98%E7%B1%B3%20(1002).jpg',
      },
    ],
  },
  {
    id: 2,
    imgs: [
      {
        id: 6,
        src: 'https://wp-1302605407.cos.ap-beijing.myqcloud.com/img%2F%E4%BA%8C%E6%AC%A1%E5%85%83%E5%8A%A8%E6%BC%AB%E5%9B%BE%E5%BA%93%2F%E7%A7%92%E9%80%9F5%E3%82%BB%E3%83%B3%E3%83%81%E3%83%A1%E3%83%BC%E3%83%88%E3%83%AB%2F%E7%A7%92%E9%80%9F5%E5%8E%98%E7%B1%B3%20(1003).jpg',
      },
    ],
  },
];

const ItineraryDetails = () => {
  // 样式类型
  const [classType, setClassType] = useState<number>(1);
  // 获取当前窗口大小
  const size = useSize(document.body);
  // 当前的详情对象
  const [detailObj, setDetailObj] = useState<any>({
    id: 1,
    timeData: '2019/01/02',
    title: '模拟数据1',
    content:
      '这是模拟数据这是模拟数据据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据',
    img: 'https://wp-1302605407.cos.ap-beijing.myqcloud.com/img%2F%E4%BA%8C%E6%AC%A1%E5%85%83%E5%8A%A8%E6%BC%AB%E5%9B%BE%E5%BA%93%2F%E7%A7%92%E9%80%9F5%E3%82%BB%E3%83%B3%E3%83%81%E3%83%A1%E3%83%BC%E3%83%88%E3%83%AB%2F%E7%A7%92%E9%80%9F5%E5%8E%98%E7%B1%B3%20(1).jpg',
  });
  // 当前的选中图片
  const [currentImg, setCurrentImg] = useState<any>(list[0].imgs[0]);
  // 修改当前的选中图片
  const changeImg = (v) => {
    currentImg.id !== v.id && setCurrentImg(v);
  };
  // 轮播渲染函数
  const renderItem = (item) => {
    return (
      <div className={styles.CarouselCustomItem} key={item.id}>
        {item.imgs &&
          item.imgs[0] &&
          item.imgs.map((ite, ind) => (
            <div
              key={ind}
              onClick={() => changeImg(ite)}
              className={
                currentImg.id === ite.id
                  ? styles.CarouselCustomItemImgActive
                  : styles.CarouselCustomItemImg
              }
            >
              <img src={ite.src} />
            </div>
          ))}
        {item.imgs.length < 5 && (
          <div className={styles.CarouselCustomItemLoading}>loading...</div>
        )}
      </div>
    );
  };

  // 监听页面宽度
  useEffect(() => {
    if (size?.width && size?.width < 700) {
      setClassType(0);
    }
    if (size?.width && size?.width >= 1100) {
      setClassType(1);
    }
    if (size?.width && size?.width >= 700 && size?.width < 1100) {
      setClassType(2);
    }
  }, [size?.width]);

  // 初始化
  useEffect(() => {
    addLayoutNavStyle();
    setBg(false);
  }, []);

  return (
    <div className={styles.itineraryDetails}>
      <div className={classType ? styles.content : styles.content_mobile}>
        <div className={styles.img_box}>
          <div className={styles.imgBig}>
            <img className={styles.img} src={currentImg.src} alt="" />
            <img className={styles.imgBackground} src={currentImg.src} alt="" />
          </div>
          <div className={styles.imgList}>
            <CarouselCustom list={list} renderItem={renderItem} />
          </div>
        </div>
        <div className={styles.information_box}>
          <div className={styles.info_top}>
            <div className={styles.info_top_time}>2019/08/01</div>
            {classType !== 2 && classType > 0 ? (
              <div className={styles.info_top_place}>
                {detailObj.place || '地点'}
              </div>
            ) : (
              ''
            )}
            <div className={styles.info_top_weather}>
              <SysIcon
                className={styles.info_top_weather_icon}
                type="icon-zhongdaodaxue"
              />
              <div className={styles.info_top_weather_name}>下雪了</div>
            </div>
            <div className={styles.info_top_mood}>
              <SysIcon
                className={styles.info_top_mood_icon}
                type="icon-kaixin"
              />
              <div className={styles.info_top_mood_name}>开心</div>
            </div>
          </div>
          <div className={styles.info_title}>
            <div className={styles.info_title_name}>{detailObj.title}</div>
            {classType !== 2 && classType > 0 ? (
              ''
            ) : (
              <div className={styles.info_title_place}>
                ——{detailObj.place || '地点'}
              </div>
            )}
          </div>
          <div className={styles.info_content}>
            <div className={styles.info_content_desc}>{detailObj.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetails;
