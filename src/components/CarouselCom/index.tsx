import React from 'react';
import { Carousel } from 'antd';
import styles from './index.less';

// 配置项
interface CarouselConfig {
  autoplay?: boolean; // 是否自动播放
  autoplaySpeed?: number; // 自动播放时间
  draggable?: boolean; // 是否支持拖动切换
  pauseOnHover?: boolean; // 鼠标移入是否暂停自动播放
}

interface Props {
  list: any[]; // 轮播列表
  renderItem: (item: any) => any; // 渲染函数
  config?: CarouselConfig; // 配置项
}

const CarouselCom = (props: Props) => {
  const { list, renderItem, config = {} } = props;
  const {
    autoplay = false,
    autoplaySpeed = 3000,
    draggable = true,
    pauseOnHover = true,
  } = config;
  return (
    <div className={styles.carouselCom}>
      <Carousel
        pauseOnHover={pauseOnHover}
        draggable={draggable}
        autoplaySpeed={autoplaySpeed}
        autoplay={autoplay}
        dots={{ className: styles.dotsItem }}
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
