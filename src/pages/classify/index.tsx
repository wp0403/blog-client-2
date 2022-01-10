/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:04:51
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-05 17:18:07
 */
import React from 'react';
import styles from './index.less';

const Classify = (props: any) => {
  return (
    <div>
      classify 分类
      {props.children}
    </div>
  );
};

export default Classify;
