/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:03:48
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-02-06 08:10:37
 */
import React from 'react';
import type { UserDate } from '@/utils/globalDataUtils';
import { getGlobalUserData } from '@/utils/globalDataUtils';
// import ReactMarkdown from 'react-markdown';
import styles from './index.less';

const About = () => {
  const userData = getGlobalUserData() as UserDate;

  console.log(userData);

  return (
    <div className={styles.about}>
      <div className={styles.content}>
        {userData.about_page}
        {/* <ReactMarkdown>{userData.about_page}</ReactMarkdown> */}
      </div>
    </div>
  );
};

export default About;
