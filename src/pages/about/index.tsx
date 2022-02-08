/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:03:48
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-02-08 14:40:23
 */
import React from 'react';
import type { UserDate } from '@/utils/globalDataUtils';
import { getGlobalUserData } from '@/utils/globalDataUtils';
import styles from './index.less';
import RanderMarkdown from '@/components/RanderMarkdown';

const About = () => {
  const userData = getGlobalUserData() as UserDate;

  console.log(userData);

  return (
    <div className={styles.about}>
      <div className={styles.content}>
        <RanderMarkdown markdown={userData.about_page} />
      </div>
    </div>
  );
};

export default About;
