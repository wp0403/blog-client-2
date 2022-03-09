/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:04:51
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-03-09 18:19:34
 */
import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { getOnlyDictObj } from '@/utils/globalDataUtils';
import { addLayoutNavStyle } from '@/utils/utils';
import styles from './index.less';

const Classify = () => {
  // 分类列表
  const [classList, setClassList] = useState<any[] | any>([]);

  // 跳转博文列表页
  const goClassifyList = (obj, type) => {
    history.push({ pathname: `/classify/list/${obj.id}/${type}` });
  };

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
              <span
                onClick={() =>
                  goClassifyList(
                    { classDesc: item.classDesc, id: item.id },
                    'one',
                  )
                }
                className={styles.classItem_name}
              >
                {item.classDesc}
              </span>
            </div>
            <div className={styles.classItem_subList}>
              {item.children?.map((ite) => (
                <span
                  onClick={() =>
                    goClassifyList(
                      { classDesc: ite.classDesc, id: ite.id },
                      'two',
                    )
                  }
                  key={ite.id}
                >
                  {ite.classDesc}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classify;
