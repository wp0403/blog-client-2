/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:13:12
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-07-08 14:01:45
 */
import React, { useEffect, useState } from 'react';
import { Link } from 'umi';
import { useSize } from 'ahooks';
import api from '@/api';
import {
  setBg,
  layoutContent,
  bindHandleScroll,
  removeScroll,
  removeLayoutNavStyle,
} from '@/utils/utils';
import { getDictObj } from '@/utils/globalDataUtils';
import { itineraryData, formatDate } from '@/utils/dataUtils';
import SysIcon from '@/components/SysIcon';
import BackTopCom from '@/components/BackTopCom';
import LoadingCard from '@/components/LoadingCard';
import styles from './index.less';

const { itinerary } = api;

const Itinerary = () => {
  // 跳转详情页
  const goDetail = (id) => {
    // history.push(`/itinerary/details/${id}`);
    return `/itinerary/details/${id}`;
  };
  // 列表数据
  const [list, setList] = useState<any[]>([]);
  // 当前页
  const [page, setPage] = useState<number>(1);
  // 每页条数
  const [pageSize, setPageSize] = useState<number>(10);
  // 搜索关键字
  const [keyword, setKeyword] = useState<string>('');
  // loading
  const [loading, setLoading] = useState<boolean>(false);
  // 样式类型
  const [classType, setClassType] = useState<number>(1);
  // 获取当前窗口大小
  const size = useSize(document.body);

  // 获取列表数据
  const getList = async () => {
    setLoading(true);
    await itinerary
      ._getItineraryList({
        params: { page, page_size: pageSize, keyword },
      })
      .then(({ data }) => {
        if (data.code === 200) {
          page !== 1 ? setList([...list, ...data.data]) : setList(data.data);
        }
      })
      .finally(() => setLoading(false));
  };

  // 获取数据
  useEffect(() => {
    getList();
  }, [page, pageSize, keyword]);

  // 监听页面宽度
  useEffect(() => {
    if (size?.width && size?.width < 700) {
      setClassType(1);
    }
    if (size?.width && size?.width >= 700) {
      setClassType(0);
    }
  }, [size?.width]);

  // 初始化
  useEffect(() => {
    bindHandleScroll();
    setBg(false);
    removeLayoutNavStyle();

    return () => {
      removeScroll();
    };
  }, []);

  return (
    <div className={styles.itinerary}>
      {loading ? (
        <div className={styles.loadingBox}>
          <LoadingCard />
        </div>
      ) : (
        <div className={styles.content}>
          {itineraryData(list).map((item: any, index: number) => (
            <div className={styles.list_box} key={index}>
              <div className={styles.type}>
                <div className={styles.type_name}>{item.type}</div>
                <SysIcon
                  className={styles.type_icon}
                  type="icon-a-youjiantouqianwang"
                />
              </div>
              <div className={styles.type_content}>
                {item.list.map((v: any, ind: number) => (
                  <Link
                    className={classType ? styles.item_mobile : styles.item}
                    key={ind}
                    to={v.id && goDetail(v.id)}
                    onClick={(e) => !v.id && e.preventDefault()}
                  >
                    <div className={styles.item_info}>
                      <div className={styles.item_info_top}>
                        <div className={styles.item_info_top_time}>
                          {formatDate(v?.timeData, 'yyyy-MM-dd') || '--'}
                        </div>
                        {classType ? (
                          ''
                        ) : (
                          <div className={styles.item_info_top_place}>
                            {v.place || '地点'}
                          </div>
                        )}

                        <div className={styles.item_info_top_weather}>
                          {v.weatherId && (
                            <>
                              <SysIcon
                                className={styles.item_info_top_weather_icon}
                                type={
                                  getDictObj('weather_list', +v?.weatherId)
                                    ?.icon
                                }
                              />
                              <div
                                className={styles.item_info_top_weather_name}
                              >
                                {getDictObj('weather_list', +v?.weatherId)
                                  ?.value || '--'}
                              </div>
                            </>
                          )}
                        </div>
                        <div className={styles.item_info_top_mood}>
                          {v.moodId && (
                            <>
                              <SysIcon
                                className={styles.item_info_top_mood_icon}
                                type={getDictObj('mood_list', +v?.moodId)?.icon}
                              />
                              <div className={styles.item_info_top_mood_name}>
                                {getDictObj('mood_list', +v?.moodId)?.value ||
                                  '--'}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className={styles.item_info_title}>
                        {classType ? (
                          <div className={styles.item_info_title_place}>
                            {v.place || '地点'}——
                          </div>
                        ) : (
                          ''
                        )}
                        <div className={styles.item_info_title_name}>
                          {v.title}
                        </div>
                      </div>
                      <div className={styles.item_info_desc}>{v.content}</div>
                    </div>
                    <div className={styles.item_img}>
                      <img src={v.img} alt="" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <BackTopCom visibilityHeight={100} target={() => layoutContent} />
    </div>
  );
};

export default Itinerary;
