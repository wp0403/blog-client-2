/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-03-10 18:03:32
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-03-10 18:09:53
 */
import React from 'react';
import SysIcon from '@/components/SysIcon';
import styles from './index.less';

const ItineraryDetails = () => {
  return (
    <div className={styles.itineraryDetails}>
      <div className={styles.header}>
        <div className={styles.header_top}>这是一个大标题大大大标题</div>
        <div className={styles.header_bottom}></div>
      </div>
      <div className={styles.main}></div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default ItineraryDetails;
