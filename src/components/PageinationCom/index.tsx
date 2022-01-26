/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-26 17:16:32
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-26 17:30:21
 */
import React from 'react';
import SysIcon from '@/components/SysIcon';
import styles from './index.less';

interface Props {
  page: number; // 当前页
  totalPages: number; // 总页数
  changePage: Function; // 切换页事件
}

const PageinationCom = (props: Props) => {
  const { page, totalPages, changePage } = props;

  const onClickPageItem = (value) => {
    changePage(value);
  };

  const createArr = (start, end) => {
    const result: number[] = [];

    for (let i = start; i <= end; i++) {
      result.push(i);
    }

    return result;
  };

  const renderPage = (page, totalPages) => {
    if (totalPages <= 5) {
      return createArr(2, totalPages - 1).map((item, index) => (
        <div
          key={index}
          className={`${styles.pageBox_con_item} ${
            page === item && styles.pageBox_con_item_active
          }`}
          onClick={() => onClickPageItem(item)}
        >
          {item}
        </div>
      ));
    } else if (page <= 4) {
      return createArr(2, 6).map((item, index) => (
        <div
          key={index}
          className={`${styles.pageBox_con_item} ${
            page === item && styles.pageBox_con_item_active
          }`}
          onClick={() => onClickPageItem(item)}
        >
          {item}
        </div>
      ));
    } else if (totalPages - page <= 2) {
      return createArr(totalPages - 4, totalPages - 1).map((item, index) => (
        <div
          key={index}
          className={`${styles.pageBox_con_item} ${
            page === item && styles.pageBox_con_item_active
          }`}
          onClick={() => onClickPageItem(item)}
        >
          {item}
        </div>
      ));
    } else {
      return createArr(page - 2, page + 2).map((item, index) => (
        <div
          key={index}
          className={`${styles.pageBox_con_item} ${
            page === item && styles.pageBox_con_item_active
          }`}
          onClick={() => onClickPageItem(item)}
        >
          {item}
        </div>
      ));
    }
  };

  return (
    <div className={styles.pageBox}>
      <SysIcon
        className={styles.pageBox_prev}
        type="icon-a-zuojiantouzuo"
        onClick={() => page > 1 && onClickPageItem(page - 1)}
      />
      <div className={styles.pageBox_con}>
        <div
          className={`${styles.pageBox_con_first} ${
            page === 1 && styles.pageBox_con_item_active
          }`}
          onClick={() => onClickPageItem(1)}
        >
          1
        </div>
        {page - 2 > 0 && totalPages >= 5 && (
          <SysIcon type="icon-a-gengduohengxiang" />
        )}
        {renderPage(page, totalPages)}
        {totalPages - 2 >= page && totalPages >= 5 && (
          <SysIcon type="icon-a-gengduohengxiang" />
        )}
        {totalPages > 1 && (
          <div
            className={`${styles.pageBox_con_last} ${
              page === totalPages && styles.pageBox_con_item_active
            }`}
            onClick={() => onClickPageItem(totalPages)}
          >
            {totalPages}
          </div>
        )}
      </div>
      <SysIcon
        className={styles.pageBox_next}
        type="icon-a-youjiantouyou"
        onClick={() => page < totalPages && onClickPageItem(page + 1)}
      />
    </div>
  );
};

export default PageinationCom;
