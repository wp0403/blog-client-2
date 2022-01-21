/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:06:42
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-21 10:56:25
 */
import React, { useEffect, useState } from 'react';
import { useSize } from 'ahooks';
import moment from 'moment';
import SysIcon from '@/components/SysIcon';
import { stringReplaceP } from '@/utils/dataUtils';
import { setBg, addLayoutNavStyle } from '@/utils/utils';
import styles from './index.less';

const str =
  '在吗？先生？我有好多事情想与你说，你会替我保密的对吧？\\n先生，你在吗？为什么你从来都不会与我说说我没见过的世界啊？\\n先生，我遇到好多问题，但是我不知道能够跟谁去说说，你可以听我说吗？先生。\\n先生我不太开心，也说不上来为什么，呀！你怎么知道我在想什么，可是先生，我放不下啊！\\n先生，你也会不开心的吧，没关系的先生，我会一直在，一直在的。';

const list = [
  {
    id: 1,
    time_str: '2022/01/01',
    author: '于风里读诗',
    type: '随笔',
    content:
      '你也没有难看到没有人喜欢吧 你也没有学习差的年级倒数吧 你也没有低到世界最矮吧 你也没有社交恐惧到不能与人交流吧 你也没有近视到看不见东西吧 你也没有发际线高到秃头吧 你也没有人缘差的没朋友吧 你也没有家境差到吃不了饭吧 你也没有胖到200斤吧 那你还怕什么？ 世界留给你的余地还很多。',
  },
  {
    id: 2,
    time_str: '2022/01/02',
    author: '于风里读诗',
    type: '随笔',
    content:
      '你也没有难看到没有人喜欢吧 你也没有学习差的年级倒数吧 你也没有低到世界最矮吧 你也没有社交恐惧到不能与人交流吧 你也没有近视到看不见东西吧 你也没有发际线高到秃头吧 你也没有人缘差的没朋友吧 你也没有家境差到吃不了饭吧 你也没有胖到200斤吧 那你还怕什么？ 世界留给你的余地还很多。',
  },
  {
    id: 3,
    time_str: '2022/01/03',
    author: '于风里读诗',
    type: '随笔',
    content:
      '你也没有难看到没有人喜欢吧 你也没有学习差的年级倒数吧 你也没有低到世界最矮吧 你也没有社交恐惧到不能与人交流吧 你也没有近视到看不见东西吧 你也没有发际线高到秃头吧 你也没有人缘差的没朋友吧 你也没有家境差到吃不了饭吧 你也没有胖到200斤吧 那你还怕什么？ 世界留给你的余地还很多。',
  },
  {
    id: 4,
    time_str: '2022/01/04',
    author: '于风里读诗',
    type: '随笔',
    content:
      '你也没有难看到没有人喜欢吧 你也没有学习差的年级倒数吧 你也没有低到世界最矮吧 你也没有社交恐惧到不能与人交流吧 你也没有近视到看不见东西吧 你也没有发际线高到秃头吧 你也没有人缘差的没朋友吧 你也没有家境差到吃不了饭吧 你也没有胖到200斤吧 那你还怕什么？ 世界留给你的余地还很多。',
  },
  {
    id: 5,
    time_str: '2022/01/05',
    author: '于风里读诗',
    type: '随笔',
    content:
      '你也没有难看到没有人喜欢吧 你也没有学习差的年级倒数吧 你也没有低到世界最矮吧 你也没有社交恐惧到不能与人交流吧 你也没有近视到看不见东西吧 你也没有发际线高到秃头吧 你也没有人缘差的没朋友吧 你也没有家境差到吃不了饭吧 你也没有胖到200斤吧 那你还怕什么？ 世界留给你的余地还很多。',
  },
];

const Secret = () => {
  // 获取当前窗口大小
  const size = useSize(document.body);
  // 样式类型
  const [classType, setClassType] = useState<number>(1);
  // 当前的时间
  const [time, setTime] = useState<string>(moment(new Date()).format('LTS'));

  const renderSecretList = () => {
    return list.map((item, index) => (
      <div className={styles.secret_item} key={item.id}>
        {classType && classType === 1 ? (
          index % 2 === 0 ? (
            <>
              <div className={styles.secret_item_content}>
                <div className={styles.secret_item_content_con}>
                  <div className={styles.secret_item_content_con_title}>
                    {item.type}-{item.time_str}
                  </div>
                  <div className={styles.secret_item_content_con_txt}>
                    {item.content}
                  </div>
                </div>
                <div className={styles.secret_item_content_label}>
                  <SysIcon type="icon-yezi1" className={styles.icon} />
                </div>
              </div>
              <div className={styles.secret_item_null}></div>
            </>
          ) : (
            <>
              <div className={styles.secret_item_null}></div>
              <div className={styles.secret_item_content}>
                <div className={styles.secret_item_content_label}>
                  <SysIcon type="icon-yezi2" className={styles.icon} />
                </div>
                <div className={styles.secret_item_content_con}>
                  <div className={styles.secret_item_content_con_title}>
                    {item.type}-{item.time_str}
                  </div>
                  <div className={styles.secret_item_content_con_txt}>
                    {item.content}
                  </div>
                </div>
              </div>
            </>
          )
        ) : (
          ''
        )}
        {classType === 2 || classType === 0 ? (
          <div className={styles.secret_item_content}>
            <div className={styles.secret_item_content}>
              <div className={styles.secret_item_content_label}>
                <SysIcon type="icon-yezi1" className={styles.icon} />
              </div>
              <div className={styles.secret_item_content_con}>
                <div className={styles.secret_item_content_con_title}>
                  {item.type}-{item.time_str}
                </div>
                <div className={styles.secret_item_content_con_txt}>
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    ));
  };

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
    if (size?.width && size?.width < 700) {
      setClassType(0);
    }
    if (size?.width && size?.width >= 700) {
      setClassType(1);
    }
    if (size?.width && size?.width <= 860 && size?.width >= 700) {
      setClassType(2);
    }
  }, [size?.width]);

  return (
    <div
      className={`${styles.secret} ${
        classType ? styles.secret_pc : styles.secret_mobile
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
          <div className={styles.left_bottom}>
            <div className={styles.left_bottom_border} />
            于风里读诗
          </div>
        </div>
        <div className={styles.right}>
          <div
            className={`${styles.right_content} ${
              (classType === 2 || classType === 0) && styles.right_content_1
            }`}
          >
            {renderSecretList()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Secret;
