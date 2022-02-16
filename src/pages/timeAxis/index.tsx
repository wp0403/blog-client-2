/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:07:43
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-02-15 18:33:40
 */
import React, { useEffect } from 'react';
import { useSize } from 'ahooks';
import { setBg } from '@/utils/utils';
import styles from './index.less';

const TimeAxis = () => {
  useEffect(() => {
    setBg(false);
  }, []);
  return (
    <div className={styles.timeAxis}>
      <div className="header"></div>
      <div className="main"></div>
      <div className="footer"></div>
    </div>
  );
};

export default TimeAxis;
