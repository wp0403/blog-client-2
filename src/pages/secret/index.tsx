/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:06:42
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-19 18:16:32
 */
import React, { useEffect, useState } from 'react';
import { useSize } from 'ahooks';
import moment from 'moment';
import { stringReplaceP } from '@/utils/dataUtils';
import { setBg, addLayoutNavStyle } from '@/utils/utils';
import styles from './index.less';

const str =
  '在吗？先生？我有好多事情想与你说，你会替我保密的对吧？\\n先生，你在吗？为什么你从来都不会与我说说我没见过的世界啊？\\n先生，我遇到好多问题，但是我不知道能够跟谁去说说，你可以听我说吗？先生。\\n先生我不太开心，也说不上来为什么，呀！你怎么知道我在想什么，可是先生，我放不下啊！\\n先生，你也会不开心的吧，没关系的先生，我会一直在，一直在的。';

const Secret = () => {
  // 获取当前窗口大小
  const size = useSize(document.body);
  // 样式类型
  const [classType, setClassType] = useState<number>(1);
  // 当前的时间
  const [time, setTime] = useState<string>(moment(new Date()).format('LTS'));

  // 初始化
  useEffect(() => {
    addLayoutNavStyle();
    setBg(false);

    const timerId = setInterval(() => {
      setTime(moment(new Date()).format('LTS'));
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);
  // 监听页面宽度，设置样式
  useEffect(() => {
    console.log(stringReplaceP(str));

    if (size?.width && size?.width < 700) {
      setClassType(1);
    }
    if (size?.width && size?.width >= 700) {
      setClassType(0);
    }
  }, [size?.width]);

  return (
    <div
      className={`${styles.secret} ${
        classType ? styles.secret_mobile : styles.secret_pc
      }`}
    >
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.time}>{time}</div>
          <div className={styles.left_con}>
            {stringReplaceP(str).map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
          <div className={styles.left_bottom}>————</div>
        </div>
        <div className={styles.right}>secret 树洞先生</div>
      </div>
    </div>
  );
};

export default Secret;
