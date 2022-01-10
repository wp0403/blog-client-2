/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-07 17:34:37
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-10 16:33:53
 */
import React, { useEffect, useState } from 'react';
import { BackTop } from 'antd';
import SysIcon from '../SysIcon';
import styles from './index.less';

interface Props {
  target: any;
  visibilityHeight: number;
  icon?: string;
  duration?: number;
}

const Backtop = (props: Props) => {
  const { icon, target, visibilityHeight, duration } = props;

  return (
    <BackTop
      target={target}
      visibilityHeight={visibilityHeight}
      duration={duration}
    >
      <div className={styles.backDom}>
        <SysIcon type={icon ? icon : 'icon-a-zhidingdingbu'} />
      </div>
    </BackTop>
  );
};

export default Backtop;
