/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:07:43
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-02-21 11:34:39
 */
import React, { useEffect } from 'react';
import { useSize } from 'ahooks';
import { setBg } from '@/utils/utils';
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
];

const TimeAxis = () => {
  useEffect(() => {
    setBg(false);
  }, []);
  return (
    <div className={styles.timeAxis}>
      <div className={styles.header}>网站成长史</div>
      <div className={styles.main}>
        {arr.map((item, index) => (
          <div className={styles.list_item}>{item.title}</div>
        ))}
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default TimeAxis;
