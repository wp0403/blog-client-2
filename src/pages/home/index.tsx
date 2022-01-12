/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-23 16:28:08
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-12 18:19:24
 */
import React, { useEffect, useRef, useState } from 'react';
import { useSize } from 'ahooks';
import { setBg, bindHandleScroll, removeScroll } from '@/utils/utils';
import Typewriter from '@/components/Typewriter';
import SysIcon from '@/components/SysIcon';
import AboutMe from './components/AboutMe';
import CarouselHome from './components/Graphic';
import styles from './index.less';

const Home = () => {
  const aboutMeDom = useRef<any>(null);
  // 获取当前窗口大小
  const size = useSize(document.body);
  // 样式类型
  const [classType, setClassType] = useState<number>(1);

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
          <div className={styles.title_mobile}>世人万千，再难遇我</div>
        </div>
      ) : (
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
      )}
      <div className={styles.about_me} ref={aboutMeDom}>
        <AboutMe />
      </div>
      <div className={styles.carousel}>
        <CarouselHome />
      </div>
    </div>
  );
};

export default Home;
