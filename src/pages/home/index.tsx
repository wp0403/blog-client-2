/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-23 16:28:08
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-10 18:15:50
 */
import React, { useEffect, useRef } from 'react';
import { setBg, bindHandleScroll, removeScroll } from '@/utils/utils';
import Typewriter from '@/components/Typewriter';
import SysIcon from '@/components/SysIcon';
import styles from './index.less';

const Home = () => {
  const aboutMeDom = useRef<any>(null);

  const goAbout = () => {
    const target = document.getElementById('pro_layout_content') as any;
    const aboutMeTop = aboutMeDom.current.offsetTop;
    target.scrollTop = aboutMeTop;
  };
  // 初始化
  useEffect(() => {
    setBg(true);
    bindHandleScroll();

    return () => {
      removeScroll();
    };
  }, []);
  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <div className={styles.title}>世人万千，再难遇我</div>
        <Typewriter
          data={
            '今天终于把博客搭建上了，增加了公路旅人这个功能，可以把自己拍摄的照片和喜欢的照片上传上去了'
          }
          startTime={300}
          endTime={100}
          textBoxStyle={{ color: '#fff' }}
        />
        <div className={styles.bottom_btn} onClick={goAbout}>
          <SysIcon type="icon-a-xiajiantouxia" />
        </div>
      </div>
      <div className={styles.about_me} ref={aboutMeDom}></div>
    </div>
  );
};

export default Home;
