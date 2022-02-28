/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:07:43
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-02-28 11:33:01
 */
import React, { useEffect } from 'react';
import { useSize } from 'ahooks';
import {
  setBg,
  bindHandleScroll,
  removeScroll,
  layoutContent,
} from '@/utils/utils';
import SysIcon from '@/components/SysIcon';
import styles from './index.less';

const arr = [
  {
    id: 1,
    time: '2022/01/01',
    title: '第一个标题',
    desc: '这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字',
  },
  {
    id: 2,
    time: '2022/01/02',
    title: '第2个标题',
    desc: '这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字',
  },
  {
    id: 3,
    time: '2022/01/03',
    title: '第3个标题',
    desc: '这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字',
  },
  {
    id: 4,
    time: '2022/01/04',
    title: '第4个标题',
    desc: '这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字',
  },
  {
    id: 5,
    time: '2022/01/05',
    title: '第5个标题',
    desc: '这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字',
  },
  {
    id: 11,
    time: '2022/01/01',
    title: '第一个标题',
    desc: '这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字',
  },
  {
    id: 12,
    time: '2022/01/02',
    title: '第2个标题',
    desc: '这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字',
  },
  {
    id: 13,
    time: '2022/01/03',
    title: '第3个标题',
    desc: '这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字',
  },
  {
    id: 14,
    time: '2022/01/04',
    title: '第4个标题',
    desc: '这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字',
  },
  {
    id: 15,
    time: '2022/01/05',
    title: '第5个标题',
    desc: '这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字',
  },
];

const TimeAxis = () => {
  // 初始化
  useEffect(() => {
    setBg(false);
    bindHandleScroll();

    return () => {
      removeScroll();
    };
  }, []);
  return (
    <div className={styles.timeAxis}>
      <div className={styles.main}>
        {arr.map((item, index) => (
          <div className={styles.list_item} key={index}>
            <div className={styles.list_item_left}>
              <div className={styles.list_item_left_icon}>
                <SysIcon type="icon-yezi-" />
              </div>
              <div className={styles.list_item_left_time}>{item.time}</div>
            </div>
            <div className={styles.list_item_border} />
            <div className={styles.list_item_right}>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeAxis;
