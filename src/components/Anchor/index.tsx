/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-14 15:38:44
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-14 18:16:06
 */
import React from 'react';
import { layoutContent } from '@/utils/utils';
import { scrollTo } from '@/utils/elementUtils';
import styles from './index.less';

interface Props {
  style?: React.CSSProperties; // 行内样式
  onClick?: React.MouseEventHandler<HTMLElement>; // 点击事件
  className?: string; // 类名
  getContainer?: () => HTMLElement | Window | Document; // 滚动元素
  endposition: number; // 滚动到的位置
  children: any;
}

const Anchor = (props: Props) => {
  const {
    children,
    getContainer = () => layoutContent,
    endposition,
    onClick,
  } = props;

  const goScrollTo = () => {
    scrollTo(endposition, { getContainer });
  };

  const renderAnchor = () => {};

  return (
    <div onClick={goScrollTo} className={styles.anchor}>
      {children ? children : renderAnchor()}
    </div>
  );
};

export default Anchor;
