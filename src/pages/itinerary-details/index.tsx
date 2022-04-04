/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-03-10 18:03:32
 * @LastEditors: 王鹏
 * @LastEditTime: 2022-04-05 00:30:24
 */
import React, { useEffect, useState } from 'react';
import { useSize } from 'ahooks';
import api from '@/api';
import SysIcon from '@/components/SysIcon';
import { setBg, addLayoutNavStyle } from '@/utils/utils';
import CarouselCustom from '@/components/CarouselCustom';
import styles from './index.less';

const { itinerary } = api;

const ItineraryDetails = (props) => {
  const { pathname } = props.location;
  // id为详情id
  const id = pathname.split('/').pop();
  // 样式类型
  const [classType, setClassType] = useState<number>(1);
  // 获取当前窗口大小
  const size = useSize(document.body);
  // 当前的详情对象
  const [detailObj, setDetailObj] = useState<any>({});
  // 当前的选中图片
  const [currentImg, setCurrentImg] = useState<any>(
    detailObj.imgs && detailObj.imgs[0],
  );
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

  const getData = async () => {
    await itinerary._getItineraryDetail({ params: { id } }).then(({ data }) => {
      if (data.code === 200) {
        setDetailObj(data.data);
      }
    });
  };

  useEffect(() => {
    getData();
  }, [id]);

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
            <CarouselCustom list={currentImg.imgs} renderItem={renderItem} />
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
