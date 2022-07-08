/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-11 11:42:16
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-11-04 17:52:29
 */
import React from 'react';
import { stringReplace } from '@/utils/dataUtils';
import type { User } from '@/utils/globalDataUtils';
import { getGlobalUserData } from '@/utils/globalDataUtils';
import styles from './index.less';

const AboutMe = () => {
  // 博主信息
  const userData = getGlobalUserData() as User;

  return (
    <div className={styles.about_me}>
      <div className={styles.title}>关于我</div>
      <div className={styles.border} />
      <div className={styles.tags}>
        {userData?.siteInfo?.personal_label &&
          userData?.siteInfo?.personal_label
            .split('、')
            .map((item, index) => <span key={index}>{item}</span>)}
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: userData?.siteInfo?.home_about
            ? stringReplace(userData?.siteInfo?.home_about)
            : '',
        }}
      />
      <div className={styles.mask} />
    </div>
  );
};

export default AboutMe;
