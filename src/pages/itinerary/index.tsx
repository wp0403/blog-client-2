/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:13:12
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-03-15 16:56:20
 */
import React, { useEffect } from 'react';
import { history } from 'umi';
import { setBg, addLayoutNavStyle, layoutContent } from '@/utils/utils';
import SysIcon from '@/components/SysIcon';
import BackTopCom from '@/components/BackTopCom';
import styles from './index.less';

const list = [
  {
    id: 1,
    time: 2019,
    data: [
      {
        id: 1,
        timeData: '2019/01/02',
        title: '模拟数据1',
        content:
          '这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据',
        img: 'https://wp-1302605407.cos.ap-beijing.myqcloud.com/img%2F%E4%BA%8C%E6%AC%A1%E5%85%83%E5%8A%A8%E6%BC%AB%E5%9B%BE%E5%BA%93%2F%E7%A7%92%E9%80%9F5%E3%82%BB%E3%83%B3%E3%83%81%E3%83%A1%E3%83%BC%E3%83%88%E3%83%AB%2F%E7%A7%92%E9%80%9F5%E5%8E%98%E7%B1%B3%20(1).jpg',
      },
      {
        id: 2,
        title: '模拟数据2',
        content:
          '这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据',
        img: 'https://wp-1302605407.cos.ap-beijing.myqcloud.com/img%2F%E4%BA%8C%E6%AC%A1%E5%85%83%E5%8A%A8%E6%BC%AB%E5%9B%BE%E5%BA%93%2F%E7%A7%92%E9%80%9F5%E3%82%BB%E3%83%B3%E3%83%81%E3%83%A1%E3%83%BC%E3%83%88%E3%83%AB%2F%E7%A7%92%E9%80%9F5%E5%8E%98%E7%B1%B3%20(1).jpg',
      },
      {
        id: 3,
        title: '模拟数据3',
        content:
          '这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据',
        img: 'https://wp-1302605407.cos.ap-beijing.myqcloud.com/img%2F%E4%BA%8C%E6%AC%A1%E5%85%83%E5%8A%A8%E6%BC%AB%E5%9B%BE%E5%BA%93%2F%E7%A7%92%E9%80%9F5%E3%82%BB%E3%83%B3%E3%83%81%E3%83%A1%E3%83%BC%E3%83%88%E3%83%AB%2F%E7%A7%92%E9%80%9F5%E5%8E%98%E7%B1%B3%20(1).jpg',
      },
    ],
  },
  {
    id: 2,
    time: 2020,
    data: [
      {
        id: 1,
        title: '模拟数据1',
        content:
          '这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据',
        img: 'https://wp-1302605407.cos.ap-beijing.myqcloud.com/img%2F%E4%BA%8C%E6%AC%A1%E5%85%83%E5%8A%A8%E6%BC%AB%E5%9B%BE%E5%BA%93%2F%E7%A7%92%E9%80%9F5%E3%82%BB%E3%83%B3%E3%83%81%E3%83%A1%E3%83%BC%E3%83%88%E3%83%AB%2F%E7%A7%92%E9%80%9F5%E5%8E%98%E7%B1%B3%20(1).jpg',
      },
      {
        id: 2,
        title: '模拟数据2',
        content:
          '这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据',
        img: 'https://wp-1302605407.cos.ap-beijing.myqcloud.com/img%2F%E4%BA%8C%E6%AC%A1%E5%85%83%E5%8A%A8%E6%BC%AB%E5%9B%BE%E5%BA%93%2F%E7%A7%92%E9%80%9F5%E3%82%BB%E3%83%B3%E3%83%81%E3%83%A1%E3%83%BC%E3%83%88%E3%83%AB%2F%E7%A7%92%E9%80%9F5%E5%8E%98%E7%B1%B3%20(1).jpg',
      },
      {
        id: 3,
        title: '模拟数据3',
        content:
          '这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据',
        img: 'https://wp-1302605407.cos.ap-beijing.myqcloud.com/img%2F%E4%BA%8C%E6%AC%A1%E5%85%83%E5%8A%A8%E6%BC%AB%E5%9B%BE%E5%BA%93%2F%E7%A7%92%E9%80%9F5%E3%82%BB%E3%83%B3%E3%83%81%E3%83%A1%E3%83%BC%E3%83%88%E3%83%AB%2F%E7%A7%92%E9%80%9F5%E5%8E%98%E7%B1%B3%20(1).jpg',
      },
    ],
  },
];

const Itinerary = () => {
  // 跳转详情页
  const goDetail = (id) => {
    history.push(`/itinerary/details/${id}`);
  };

  // 初始化
  useEffect(() => {
    addLayoutNavStyle();
    setBg(false);
  }, []);

  return (
    <div className={styles.itinerary}>
      <div className={styles.content}>
        {list.map((item: any, index: number) => (
          <div className={styles.list_box} key={index}>
            <div className={styles.type}>
              <div className={styles.type_name}>{item.time}</div>
              <SysIcon
                className={styles.type_icon}
                type="icon-a-youjiantouqianwang"
              />
            </div>
            <div className={styles.type_content}>
              {item.data.map((v: any, ind: number) => (
                <div
                  className={styles.item}
                  key={ind}
                  onClick={() => goDetail(v.id)}
                >
                  <div className={styles.item_info}>
                    <div className={styles.item_info_top}>
                      <div className={styles.item_info_top_time}>
                        2019/08/01
                      </div>
                      <div className={styles.item_info_top_weather}>
                        <SysIcon
                          className={styles.item_info_top_weather_icon}
                          type="icon-zhongdaodaxue"
                        />
                        <div className={styles.item_info_top_weather_name}>
                          下雪了
                        </div>
                      </div>
                      <div className={styles.item_info_top_mood}>
                        <SysIcon
                          className={styles.item_info_top_mood_icon}
                          type="icon-kaixin"
                        />
                        <div className={styles.item_info_top_mood_name}>
                          开心
                        </div>
                      </div>
                    </div>
                    <div className={styles.item_info_title}>{v.title}</div>
                    <div className={styles.item_info_desc}>{v.content}</div>
                  </div>
                  <div className={styles.item_img}>
                    <img src={v.img} alt="" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <BackTopCom visibilityHeight={100} target={() => layoutContent} />
    </div>
  );
};

export default Itinerary;
