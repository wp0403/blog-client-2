/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-03-15 10:33:58
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-03-15 11:30:04
 */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper-bundle.css';

const SwiperCom = (props: any) => {
  return (
    <Swiper spaceBetween={50} slidesPerView={3}>
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  );
};

export default SwiperCom;
