/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-11 18:19:11
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-11 18:24:09
 */
import React from 'react';
import styles from './index.less';

const CarouselHome = () => {
  return (
    <div className={styles.carouselHome}>
      <div className={styles.title}>朝花夕拾</div>
      <div className={styles.border} />
      <div className={styles.content}></div>
    </div>
  );
};

export default CarouselHome;
