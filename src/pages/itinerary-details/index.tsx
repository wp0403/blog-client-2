/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-03-10 18:03:32
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-07-08 14:10:17
 */
import React, { useEffect, useState } from 'react';
import { useSize } from 'ahooks';
import api from '@/api';
import SysIcon from '@/components/SysIcon';
import { setBg, addLayoutNavStyle } from '@/utils/utils';
import { groupingData, formatDate } from '@/utils/dataUtils';
import CarouselCustom from '@/components/CarouselCustom';
import LoadingCard from '@/components/LoadingCard';
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
  // loading
  const [loading, setLoading] = useState<boolean>(false);
  // 当前的选中图片
  const [currentImg, setCurrentImg] = useState<any>({});
  // 修改当前的选中图片
  const changeImg = (v) => {
    currentImg.id !== v.id && setCurrentImg(v);
  };
  // 轮播渲染函数
  const renderItem = (item) => {
    return (
      <div className={styles.CarouselCustomItem} key={item.id}>
        {item?.list &&
          item?.list[0] &&
          item?.list.map((ite, ind) => (
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
        {item?.list.length < 5 && (
          <div className={styles.CarouselCustomItemLoading}>loading...</div>
        )}
      </div>
    );
  };

  const getData = async () => {
    setLoading(true);
    await itinerary
      ._getItineraryDetail({ params: { id } })
      .then(({ data }) => {
        if (data.code === 200) {
          setDetailObj(data.data);
          setCurrentImg(data.data?.imgs[0]);
        }
      })
      .finally(() => setLoading(false));
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
      {loading ? (
        <div className={styles.loadingBox}>
          <LoadingCard />
        </div>
      ) : (
        <div className={classType ? styles.content : styles.content_mobile}>
          <div className={styles.img_box}>
            <div className={styles.imgBig}>
              <img className={styles.img} src={currentImg?.src} alt="" />
              <img
                className={styles.imgBackground}
                src={currentImg?.src}
                alt=""
              />
            </div>
            <div className={styles.imgList}>
              <CarouselCustom
                list={groupingData(detailObj.imgs || [], 5)}
                renderItem={renderItem}
              />
            </div>
          </div>
          <div className={styles.information_box}>
            <div className={styles.info_top}>
              <div className={styles.info_top_time}>
                {formatDate(detailObj?.timeData, 'yyyy-MM-dd') || '--'}
              </div>
              {classType !== 2 && classType > 0 ? (
                <div className={styles.info_top_place}>
                  {detailObj?.place || '地点'}
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
              <div className={styles.info_title_name}>{detailObj?.title}</div>
              {classType !== 2 && classType > 0 ? (
                ''
              ) : (
                <div className={styles.info_title_place}>
                  ——{detailObj?.place || '地点'}
                </div>
              )}
            </div>
            <div className={styles.info_content}>
              <div className={styles.info_content_desc}>
                {detailObj?.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryDetails;
