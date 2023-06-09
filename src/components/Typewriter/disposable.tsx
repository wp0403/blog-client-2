/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-24 10:00:56
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-04-18 16:43:57
 */
import React, { useEffect } from 'react';
import style from './index.less';

interface Props {
  data: string; // 要执行的文字
}

const Typewriter = (props: Props) => {
  const { data } = props;
  const fun = () => {
    const container = document.getElementById('content');
    let index = 0;
    function writing() {
      if (index < data.length && container) {
        container.innerHTML += data[index++];
        requestAnimationFrame(writing);
      }
    }
    writing();
  };

  useEffect(() => {
    fun();
  }, []);

  return <div id="content" className={style.typewriter}></div>;
};

export default Typewriter;
