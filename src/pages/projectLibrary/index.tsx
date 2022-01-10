/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:05:40
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-05 17:19:12
 */
import React from 'react';
import styles from './index.less';

const ProjectLibrary = (props: any) => {
  return (
    <div>
      projectLibrary 项目库
      {props.children}
    </div>
  );
};

export default ProjectLibrary;
