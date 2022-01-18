/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-06 11:43:49
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-18 10:07:02
 */
import React from 'react';
import styles from './index.less';

const Img = () => {
  return (
    <div className={styles.bg} id="layout_bg">
      <img className={styles.bgImg} src="/bgImg/bg00001.jpg" />
    </div>
  );
};

export default Img;
