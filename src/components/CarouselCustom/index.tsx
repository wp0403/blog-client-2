/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-03-21 11:53:49
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-03-21 18:21:51
 */
import React, { useRef } from 'react';
import { Carousel } from 'antd';
import SysIcon from '@/components/SysIcon';
import styles from './index.less';

interface Props {
  list: any[]; // 轮播列表
  renderItem: (item: any) => any; // 渲染函数
  autoplay?: boolean; // 是否自动播放
  dots?: boolean; // 是否显示面板指示点
  autoplaySpeed?: number; // 自动播放时间
  draggable?: boolean; // 是否支持拖动切换
  infinite?: boolean; // 是否无限轮播
  pauseOnHover?: boolean; // 鼠标移入是否暂停自动播放
  effect?: 'scrollx' | 'fade' | undefined;
}

const CarouselCustom = (props: Props) => {
  const { list, renderItem } = props;

  const carousel = useRef<any>(null);

  const {
    autoplay = false,
    autoplaySpeed = 3000,
    dots = false,
    infinite = true,
    effect = 'scrollx',
    pauseOnHover = true,
  } = props;

  const prev = () => {
    carousel.current.prev();
  };

  const next = () => {
    carousel.current.next();
  };

  return (
    <div className={styles.carouselCustom}>
      <Carousel
        autoplay={autoplay}
        autoplaySpeed={autoplaySpeed}
        infinite={infinite}
        effect={effect}
        pauseOnHover={pauseOnHover}
        dots={dots && { className: styles.dotsItem }}
        lazyLoad="progressive"
        ref={carousel}
      >
        {list &&
          list[0] &&
          list.map((item, index) => (
            <div className={styles.carouselItem} key={index}>
              {renderItem(item)}
            </div>
          ))}
      </Carousel>
      <div className={styles.btn_left} onClick={prev}>
        <SysIcon type="icon-a-zuojiantouzuo" />
      </div>
      <div className={styles.btn_right} onClick={next}>
        <SysIcon type="icon-a-youjiantouyou" />
      </div>
    </div>
  );
};

export default CarouselCustom;
