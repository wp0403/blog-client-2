/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:03:48
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-02-10 13:34:52
 */
import React, { useEffect, useState } from 'react';
import { useSize } from 'ahooks';
import {
  setBg,
  removeLayoutNavStyle,
  bindHandleScroll,
  removeScroll,
  layoutContent,
} from '@/utils/utils';
import type { UserDate } from '@/utils/globalDataUtils';
import { getGlobalUserData } from '@/utils/globalDataUtils';
import styles from './index.less';
import RanderMarkdown from '@/components/RanderMarkdown';
import BackTopCom from '@/components/BackTopCom';

const About = () => {
  const userData = getGlobalUserData() as UserDate;

  // 获取当前窗口大小
  const size = useSize(document.body);
  // 样式类型
  const [classType, setClassType] = useState<number>(0);

  // 监听页面宽度，设置样式
  useEffect(() => {
    if (size?.width && size?.width < 700) {
      setClassType(1);
    }
    if (size?.width && size?.width >= 700) {
      setClassType(0);
    }
  }, [size?.width]);

  useEffect(() => {
    setBg(true);
    removeLayoutNavStyle();
    bindHandleScroll();

    return () => {
      removeScroll();
    };
  }, []);

  return (
    <div className={styles.about}>
      <div className={classType ? styles.content_mobile : styles.content}>
        <RanderMarkdown markdown={userData.about_page} />
      </div>
      <BackTopCom visibilityHeight={100} target={() => layoutContent} />
    </div>
  );
};

export default About;
