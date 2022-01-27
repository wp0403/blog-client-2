/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-27 12:36:13
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-27 12:48:20
 */
import React from 'react';
import api from '@/api';
import styles from './index.less';

const { classify } = api;

const ClassifyDetails = (props: any) => {
  const {
    state: { id },
  } = props.location;
  return <div className={styles.classifyDetails}></div>;
};

export default ClassifyDetails;
