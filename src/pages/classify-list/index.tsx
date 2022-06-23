/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2022-01-23 11:24:13
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-06-23 16:51:42
 */
import React, { useEffect, useState } from 'react';
import { history, withRouter, Link } from 'umi';
import { useSize } from 'ahooks';
import {
  setBg,
  removeLayoutNavStyle,
  bindHandleScroll,
  removeScroll,
  layoutContent,
} from '@/utils/utils';
import { stopPropagation, formatDate } from '@/utils/dataUtils';
import api from '@/api';
import SysIcon from '@/components/SysIcon';
import BackTopCom from '@/components/BackTopCom';
import LoadingCard from '@/components/LoadingCard';
import EmptyCard from '@/components/EmptyCard';
import PageinationCom from '@/components/PageinationCom';
import styles from './index.less';

const { classify } = api;

const ClassifyList = (props) => {
  const { pathname } = props.location;

  // id为类别id  type为分类标识  为了以后做单网页的收录
  const [id, type] = pathname.split('/').slice(3);

  // 获取当前窗口大小
  const size = useSize(document.body);
  // 样式类型
  const [classType, setClassType] = useState<number>(0);
  // 当前页
  const [page, setPage] = useState<number>(1);
  // 每页条数
  const [page_size, setPageSize] = useState<number>(10);
  // 总条数
  const [totalPages, setTotalPages] = useState<number>(0);
  // loading
  const [loading, setLoading] = useState<boolean>(false);
  // 列表数据
  const [list, setList] = useState<any[]>([]);

  // 获取列表数据
  const getList = async (id, type) => {
    setLoading(true);
    let getFun;
    if (type === 'one') {
      getFun = classify._getClassifyList;
    } else {
      getFun = classify._getClassifySubList;
    }
    await getFun({ params: { id, page, page_size } })
      .then(({ data }) => {
        if (data.code === 200) {
          setList(data.data);
          page === 1 && setTotalPages(Math.ceil(data.meta.total / page_size));
        }
      })
      .finally(() => setLoading(false));
  };

  // 跳转博文列表页  此处用法是刷新当前页面的location.state的参数
  const goClassifyList = (obj, type) => {
    history.push({ pathname: `/classify/list/${obj.id}/${type}` });
  };

  // 点击分类
  const clickTab = (id, type) => {
    setPage(1);
    if (type === 'one') {
      goClassifyList({ id }, 'one');
    } else {
      goClassifyList({ id }, 'two');
    }
  };

  // 切换页
  const changePage = (value) => {
    setPage(value);
  };

  // // 跳转详情页
  const goDetails = (id, title) => {
    history.push({ pathname: `/classify/details/${id}/${title}` });
  };

  // 分页变化触发
  useEffect(() => {
    getList(id, type);
  }, [page, pathname]);

  // 初始化
  useEffect(() => {
    setBg(true);
    removeLayoutNavStyle();
    bindHandleScroll();

    return () => {
      removeScroll();
    };
  }, []);

  // 监听页面宽度，设置样式
  useEffect(() => {
    if (size?.width && size?.width < 700) {
      setClassType(1);
    }
    if (size?.width && size?.width >= 700) {
      setClassType(0);
    }
  }, [size?.width]);

  // 渲染单项的样式
  const renderItem = (item) => {
    return (
      <div
        className={`${styles.list_item} ${
          classType && styles.list_item_mobile
        }`}
        key={item.id}
        onClick={() => goDetails(item.id, item.title)}
      >
        <div className={styles.list_item_left}>
          <img src={item.img} alt="" />
        </div>
        <div className={styles.list_item_right}>
          <Link
            className={styles.list_item_title}
            onClick={(e) => stopPropagation(e)}
            to={`/classify/details/${item.id}/${item.title}`}
            target="_blank"
          >
            {item.title}
          </Link>
          <div className={styles.list_item_info}>
            <div className={styles.list_item_type}>
              <SysIcon className={styles.icon} type="icon-biaoqian" />
              <span
                className={styles.list_item_type_item}
                onClick={(e) => {
                  stopPropagation(e);
                  clickTab(item.classify_id, 'one');
                }}
              >
                {item.classify}
              </span>
              |
              <span
                className={styles.list_item_type_item}
                onClick={(e) => {
                  stopPropagation(e);
                  clickTab(item.classify_sub_id, 'two');
                }}
              >
                {item.classify_sub}
              </span>
            </div>
            <div className={styles.list_item_time}>
              <SysIcon className={styles.icon} type="icon-a-shijianzuijin" />
              发布于{formatDate(item.time_str, 'yyyy-mm-dd')} 最近修改
              {formatDate(item.last_edit_time, 'yyyy-mm-dd')}
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
      {loading ? (
        <div className={styles.loadingBox}>
          <LoadingCard />
        </div>
      ) : list.length ? (
        <div className={styles.content}>
          <div
            className={`${styles.listBox} ${
              classType && styles.listBox_mobile
            }`}
          >
            {list?.map((item) => renderItem(item))}
          </div>
          <div
            className={`${styles.pageBox} ${
              classType && styles.pageBox_mobile
            }`}
          >
            <PageinationCom
              page={page}
              totalPages={totalPages}
              changePage={changePage}
            />
          </div>
        </div>
      ) : (
        <div className={styles.loadingBox}>
          <EmptyCard />
        </div>
      )}
      <BackTopCom visibilityHeight={100} target={() => layoutContent} />
    </div>
  );
};

export default withRouter(ClassifyList);
