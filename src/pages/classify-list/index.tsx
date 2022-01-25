/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2022-01-23 11:24:13
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-25 16:35:05
 */
import React, { useEffect, useState } from 'react';
import { setBg, removeLayoutNavStyle } from '@/utils/utils';
import api from '@/api';
import styles from './index.less';

const { classify } = api;

const ClassifyList = (props) => {
  const {
    state: { obj, type },
  } = props.location;

  // 当前页
  const [page, setPage] = useState<number>(1);
  // 每页条数
  const [page_size, setPageSize] = useState<number>(10);
  // 列表数据
  const [list, setList] = useState<any[]>([]);
  // 获取列表数据
  const getList = async () => {
    let getFun;
    if (type === 'one') {
      getFun = classify._getClassifyList;
    } else {
      getFun = classify._getClassifySubList;
    }
    await getFun({ params: { id: obj.id, page, page_size } }).then(
      ({ data }) => {
        if (data.code === 200) {
          setList(data.data);
        }
      },
    );
  };

  useEffect(() => {
    setBg(true);
    removeLayoutNavStyle();
    getList();
  }, []);

  return (
    <div className={styles.list}>
      <div className={styles.content}>
        <div className={styles.listBox}>
          {list?.map((item) => (
            <div className={styles.list_item}>
              <div className={styles.list_item_left}>
                <img src={item.img} alt="" />
              </div>
              <div className={styles.list_item_right}>
                <div className={styles.list_item_title}>{item.title}</div>
                <div className={styles.list_item_info}>
                  <span>{item.classify}</span>/<span>{item.classify_sub}</span>
                </div>
                <div className={styles.list_item_desc}>{item.desc}</div>
                <div className={styles.list_item_time}>
                  发布于{item.time_str} 最近修改{item.last_edit_time}
                </div>
                <div className={styles.list_item_author}>作者{item.author}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.pageBox}></div>
      </div>
    </div>
  );
};

export default ClassifyList;
