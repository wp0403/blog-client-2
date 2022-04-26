/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-23 16:28:08
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-04-26 15:13:26
 */
import React, { useEffect, useRef, useState } from 'react';
import { useSize } from 'ahooks';
import {
  setBg,
  bindHandleScroll,
  removeScroll,
  layoutContent,
  removeLayoutNavStyle,
} from '@/utils/utils';
import type { UserDate } from '@/utils/globalDataUtils';
import { getGlobalUserData } from '@/utils/globalDataUtils';
import { scrollTo } from '@/utils/elementUtils';
import Typewriter from '@/components/Typewriter';
import SysIcon from '@/components/SysIcon';
import BackTopCom from '@/components/BackTopCom';
import Footer from '@/components/Footer';
import AboutMe from './components/AboutMe';
import CarouselHome from './components/Graphic';
import styles from './index.less';

const Home = () => {
  const aboutMeDom = useRef<any>(null);
  // 获取当前窗口大小
  const size = useSize(document.body);
  // 样式类型
  const [classType, setClassType] = useState<number>(1);
  // 博主信息
  const userData = getGlobalUserData() as UserDate;

  const goAbout = () => {
    const aboutMeTop = aboutMeDom.current.offsetTop;
    scrollTo(aboutMeTop, { getContainer: () => layoutContent });
  };
  // 初始化
  useEffect(() => {
    setBg(true);
    removeLayoutNavStyle();
    bindHandleScroll();
    layoutContent.scrollTop = 0;

    return () => {
      removeScroll();
    };
  }, []);
  // 监听页面宽度，设置样式
  useEffect(() => {
    if (size?.width && size?.width < 700) {
      setClassType(1);
    }
    if (size?.width && size?.width >= 700) {
      setClassType(0);
    }
  }, [size?.width]);
  return (
    <div className={styles.home}>
      {classType === 1 ? (
        <div className={styles.header}>
          <div className={styles.title_mobile}>
            {userData?.title || '世人万千，再难遇我'}
          </div>
        </div>
      ) : (
        <div className={styles.header}>
          <div className={styles.title}>
            {userData?.title || '世人万千，再难遇我'}
          </div>
          <Typewriter
            data={
              userData?.desc ||
              '先挑起清风明月、杨柳依依和草长莺飞，少年郎的肩头，本就应当满是美好的事物啊。'
            }
            startTime={300}
            endTime={100}
            textBoxStyle={{ color: '#fff' }}
          />
          <div className={styles.bottom_btn} onClick={goAbout}>
            <SysIcon type="icon-a-xiajiantouxia" />
          </div>
        </div>
      )}
      <div className={styles.about_me} ref={aboutMeDom}>
        <AboutMe />
      </div>
      <div className={styles.carousel}>
        <CarouselHome />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
      <BackTopCom visibilityHeight={100} target={() => layoutContent} />
    </div>
  );
};

export default Home;
