/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:04:51
 * @LastEditors: 王鹏
 * @LastEditTime: 2022-01-23 01:15:45
 */
import React, { useEffect } from 'react';
import api from '@/api';
import { getOnlyDictObj } from '@/utils/globalDataUtils';
import styles from './index.less';

const { all } = api;

const Classify = (props: any) => {
  useEffect(() => {
    console.log(getOnlyDictObj('bowen_class_sub'));

    all._getIp();
  }, []);
  return <div className={styles.classify}>classify 分类</div>;
};

export default Classify;
