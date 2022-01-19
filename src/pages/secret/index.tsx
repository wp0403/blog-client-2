/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:06:42
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-19 11:56:16
 */
import React, { useEffect } from 'react';
import { setBg, addLayoutNavStyle } from '@/utils/utils';
import styles from './index.less';

const Secret = () => {
  useEffect(() => {
    addLayoutNavStyle();
    setBg(false);
  });
  return (
    <div className={styles.secret}>
      <div className={styles.header}>secret 树洞先生</div>
      <div className={styles.main}>secret 树洞先生</div>
      <div className={styles.footer}>secret 树洞先生</div>
    </div>
  );
};

export default Secret;
