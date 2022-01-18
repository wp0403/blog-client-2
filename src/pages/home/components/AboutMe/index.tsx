/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-11 11:42:16
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-18 13:46:29
 */
import React from 'react';
import { stringReplace } from '@/utils/dataUtils';
import type { UserDate } from '@/utils/globalDataUtils';
import { getGlobalUserData } from '@/utils/globalDataUtils';
import styles from './index.less';

const AboutMe = () => {
  // 博主信息
  const userData = getGlobalUserData() as UserDate;

  return (
    <div className={styles.about_me}>
      <div className={styles.title}>关于我</div>
      <div className={styles.border} />
      <div className={styles.tags}>
        {userData?.aboutTags &&
          userData?.aboutTags
            .split('、')
            .map((item, index) => <span key={index}>{item}</span>)}
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: userData?.about ? stringReplace(userData?.about) : '',
        }}
      />
      <div className={styles.mask} />
    </div>
  );
};

export default AboutMe;
