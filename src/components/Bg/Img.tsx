/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-06 11:43:49
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-10 15:53:54
 */
import React, { useEffect, useRef } from 'react';
import { useSize } from 'ahooks';
import styles from './index.less';

const Img = () => {
  const bgImg = useRef<any>();
  const { width, height } = useSize(document.body) || {
    width: document.body.offsetWidth,
    height: document.body.offsetHeight,
  };

  useEffect(() => {
    if (width > height) {
      bgImg.current.style.width = '100%';
      bgImg.current.style.height = '100%';
    } else {
      bgImg.current.style.width = 'auto';
      bgImg.current.style.height = '100%';
    }
  }, [width, height]);
  return (
    <div className={styles.bg} id="layout_bg">
      <img className={styles.bgImg} ref={bgImg} src="/bgImg/bg00001.jpg" />
    </div>
  );
};

export default Img;
