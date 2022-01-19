/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-06 11:43:49
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-19 10:18:55
 */
import React, { useState, useEffect } from 'react';
import { imgs } from '@/utils/desc';
import styles from './index.less';

interface Props {
  ind?: number;
}

const Img = (props: Props) => {
  let { ind = 0 } = props;

  if (ind > imgs.length - 1) {
    ind = 0;
  }

  return (
    <div className={styles.bg} id="layout_bg">
      <img className={styles.bgImg} src={imgs[ind].src} />
    </div>
  );
};

export default Img;
