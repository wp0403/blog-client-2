/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2022-01-23 11:24:13
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-24 11:21:03
 */
import React, { useEffect, useState } from 'react';
import { setBg, removeLayoutNavStyle } from '@/utils/utils';
import api from '@/api';
import styles from './index.less';

const { classify } = api;

const ClassifyList = (props) => {
  const {
    state: { obj, type },
  } = props.location;

  // 列表数据
  const [list, setList] = useState<any[]>([]);
  // 获取列表数据
  const getList = async () => {
    let getFun;
    if (type === 'one') {
      getFun = classify._getClassifyList;
    } else {
      getFun = classify._getClassifySubList;
    }
    await getFun({ params: { id: obj.id } }).then(({ data }) => {
      if (data.code === 200) {
        setList(data.data);
      }
    });
  };

  useEffect(() => {
    setBg(true);
    removeLayoutNavStyle();
    getList();
  }, []);

  return (
    <div className={styles.list}>
      <div className={styles.content}>
        <div className={styles.listBox}></div>
        <div className={styles.pageBox}></div>
      </div>
    </div>
  );
};

export default ClassifyList;
