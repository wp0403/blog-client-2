/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:04:51
 * @LastEditors: 王鹏
 * @LastEditTime: 2022-01-23 11:32:04
 */
import React, { useEffect, useState } from 'react';
import { getOnlyDictObj } from '@/utils/globalDataUtils';
import { addLayoutNavStyle } from '@/utils/utils';
import styles from './index.less';

const Classify = () => {
  // 分类列表
  const [classList, setClassList] = useState<any[] | any>([]);

  useEffect(() => {
    addLayoutNavStyle();
    setClassList(getOnlyDictObj('bowen_class_sub'));
  }, []);
  return (
    <div className={styles.classify}>
      <div className={styles.content}>
        {classList?.map((item) => (
          <div className={styles.classListItem} key={item.id}>
            <div className={styles.classItem}>
              <span className={styles.classItem_name}>{item.classDesc}</span>
            </div>
            <div className={styles.classItem_subList}>
              {item.children?.map((ite) => (
                <span key={ite.id}>{ite.classDesc}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classify;
