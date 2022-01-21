/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:04:51
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-21 18:03:30
 */
import React, { useEffect } from 'react';
import api from '@/api';
import styles from './index.less';

const { all } = api;

const Classify = (props: any) => {
  useEffect(() => {
    all._getIp();
  }, []);
  return <div className={styles.classify}>classify 分类</div>;
};

export default Classify;
