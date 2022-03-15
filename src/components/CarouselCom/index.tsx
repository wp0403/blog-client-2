import React from 'react';
import { Carousel } from 'antd';
import styles from './index.less';

interface Props {
  list: any[]; // 轮播列表
  renderItem: (item: any) => any; // 渲染函数
  autoplay?: boolean; // 是否自动播放
  autoplaySpeed?: number; // 自动播放时间
  draggable?: boolean; // 是否支持拖动切换
  infinite?: boolean; // 是否无限轮播
  pauseOnHover?: boolean; // 鼠标移入是否暂停自动播放
  effect?: 'scrollx' | 'fade' | undefined;
}

const CarouselCom = (props: Props) => {
  const { list, renderItem } = props;

  const {
    autoplay = true,
    autoplaySpeed = 3000,
    infinite = true,
    effect = 'scrollx',
    pauseOnHover = true,
  } = props;

  return (
    <div className={styles.carouselCom}>
      <Carousel
        autoplay={autoplay}
        autoplaySpeed={autoplaySpeed}
        infinite={infinite}
        effect={effect}
        pauseOnHover={pauseOnHover}
        dots={{ className: styles.dotsItem }}
        lazyLoad="progressive"
      >
        {list &&
          list[0] &&
          list.map((item, index) => (
            <div className={styles.carouselItem} key={index}>
              {renderItem(item)}
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default CarouselCom;
