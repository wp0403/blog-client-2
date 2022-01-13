/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-07 17:34:37
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-13 15:23:03
 */
import React, { useEffect, useState } from 'react';
import SysIcon from '@/components/SysIcon';
import styles from './index.less';

interface Props {
  target: any;
  visibilityHeight: number;
  icon?: string;
  duration?: number;
}

const BackTopCom = (props: Props) => {
  const { icon, target = () => window, visibilityHeight, duration } = props;
  // 是否显示回到顶部
  const [visible, setVisible] = useState<boolean>(false);

  const container = target();

  return (
    <div className={`${styles.backDom} ${visible && styles.backDom_active}`}>
      <SysIcon type={icon ? icon : 'icon-a-zhidingdingbu'} />
    </div>
  );
};

export default BackTopCom;
