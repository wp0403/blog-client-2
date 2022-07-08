/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:04:51
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-08-26 10:30:26
 */
import React, { useEffect, useState } from 'react';
import { history, Link } from 'umi';
import { getOnlyDictObj } from '@/utils/globalDataUtils';
import { addLayoutNavStyle } from '@/utils/utils';
import styles from './index.less';

const Classify = () => {
  // 分类列表
  const [classList, setClassList] = useState<any[] | any>([]);

  const renderLink = (obj, type) => {
    return (
      <Link
        key={obj.id}
        className={styles.classItem_name}
        to={`/classify/list/${obj.id}/${type}`}
      >
        {obj.value || '类别'}
      </Link>
    );
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
            <div className={styles.classItem}>{renderLink(item, 'one')}</div>
            <div className={styles.classItem_subList}>
              {item?.children?.map((ite) => renderLink(ite, 'two'))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classify;
