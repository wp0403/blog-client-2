/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-03-10 18:03:32
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-03-17 14:42:40
 */
import React, { useEffect } from 'react';
import SysIcon from '@/components/SysIcon';
import { setBg, addLayoutNavStyle } from '@/utils/utils';
import styles from './index.less';

const ItineraryDetails = () => {
  // 初始化
  useEffect(() => {
    addLayoutNavStyle();
    setBg(false);
  }, []);

  return <div className={styles.itineraryDetails}>div.</div>;
};

export default ItineraryDetails;
