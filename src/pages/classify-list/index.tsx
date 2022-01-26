/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2022-01-23 11:24:13
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-26 17:26:52
 */
import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import {
  setBg,
  removeLayoutNavStyle,
  bindHandleScroll,
  removeScroll,
} from '@/utils/utils';
import api from '@/api';
import SysIcon from '@/components/SysIcon';
import PageinationCom from '@/components/PageinationCom';
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
  // 总条数
  const [totalPages, setTotalPages] = useState<number>(20);
  // 列表数据
  const [list, setList] = useState<any[]>([]);
  // 获取列表数据
  const getList = async (id, type) => {
    let getFun;
    if (type === 'one') {
      getFun = classify._getClassifyList;
    } else {
      getFun = classify._getClassifySubList;
    }
    await getFun({ params: { id, page, page_size } }).then(({ data }) => {
      if (data.code === 200) {
        setList(data.data);
        // page === 1 && setTotalPages(Math.ceil(data.meta.total / page_size));
      }
    });
  };

  // 跳转博文列表页  此处用法是刷新当前页面的location.state的参数
  const goClassifyList = (obj, type) => {
    history.push({ pathname: '/classify/list', state: { obj, type } });
  };

  // 点击分类
  const clickTab = (id, type) => {
    setPage(1);
    if (type === 'one') {
      goClassifyList({ id }, 'one');
    } else {
      goClassifyList({ id }, 'two');
    }
    getList(id, type);
  };

  // 切换页
  const changePage = (value) => {
    setPage(value);
  };

  useEffect(() => {
    getList(obj.id, type);
  }, [page]);

  useEffect(() => {
    setBg(true);
    removeLayoutNavStyle();
    bindHandleScroll();

    return () => {
      removeScroll();
    };
  }, []);

  const renderItem = (item) => {
    return (
      <div className={styles.list_item} key={item.id}>
        <div className={styles.list_item_left}>
          <img src={item.img} alt="" />
        </div>
        <div className={styles.list_item_right}>
          <div className={styles.list_item_title}>{item.title}</div>
          <div className={styles.list_item_info}>
            <div className={styles.list_item_type}>
              <SysIcon className={styles.icon} type="icon-biaoqian" />
              <span
                className={styles.list_item_type_item}
                onClick={() => clickTab(item.classify_id, 'one')}
              >
                {item.classify}
              </span>
              |
              <span
                className={styles.list_item_type_item}
                onClick={() => clickTab(item.classify_sub_id, 'two')}
              >
                {item.classify_sub}
              </span>
            </div>
            <div className={styles.list_item_time}>
              <SysIcon className={styles.icon} type="icon-a-shijianzuijin" />
              发布于{item.time_str} 最近修改{item.last_edit_time}
            </div>
          </div>
          <div className={styles.list_item_desc}>
            <div className={styles.list_item_desc_text}>{item.desc}</div>
          </div>
          <div className={styles.list_item_author}>
            <div className={styles.list_item_author_border} />
            {item.author}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.list}>
      <div className={styles.content}>
        <div className={styles.listBox}>
          {list?.map((item) => renderItem(item))}
        </div>
        <div className={styles.pageBox}>
          <PageinationCom
            page={page}
            totalPages={totalPages}
            changePage={changePage}
          />
        </div>
      </div>
    </div>
  );
};

export default ClassifyList;
