/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-27 12:36:13
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-03-08 14:56:38
 */
import React, { useState, useEffect } from 'react';
import { useSize } from 'ahooks';
import { history } from 'umi';
import api from '@/api';
import {
  setBg,
  removeLayoutNavStyle,
  bindHandleScroll,
  removeScroll,
  layoutContent,
} from '@/utils/utils';
import { stringReplace } from '@/utils/dataUtils';
import LoadingCard from '@/components/LoadingCard';
import EmptyCard from '@/components/EmptyCard';
import RanderMarkdown from '@/components/RanderMarkdown';
import SysIcon from '@/components/SysIcon';
import BackTopCom from '@/components/BackTopCom';
import Permit from '@/components/Permit';
import styles from './index.less';

const { classify } = api;

const ClassifyDetails = (props: any) => {
  const { pathname } = props.location;

  // id为博文id  title为博文标题  为了以后做单网页的收录
  const [id, title] = pathname.split('/').slice(3);

  // 获取当前窗口大小
  const size = useSize(document.body);
  // 样式类型
  const [classType, setClassType] = useState<number>(0);
  // 详情数据
  const [data, setData] = useState<any>({});
  // loading
  const [loading, setLoading] = useState<boolean>(false);
  // 上一条和下一条的列表
  const [footerList, setFooterList] = useState<any[]>([]);
  // 获取详情数据
  const getClassifyDetails = async () => {
    setLoading(true);
    await classify
      ._getClassifyDetails({ params: { id } })
      .then(({ data }) => {
        if (data.code === 200) {
          setData(data.data);
        }
      })
      .finally(() => setLoading(false));
  };
  // 获取详情上一条和下一条数据
  const getClassifyDetailsFooterList = async () => {
    await classify
      ._getClassifyDetailsFooter({ params: { id } })
      .then(({ data }) => {
        if (data.code === 200) {
          setFooterList(data.data);
        }
      });
  };

  // 跳转博文列表页
  const goClassifyList = (ids, type) => {
    history.push({
      pathname: '/classify/list',
      state: { obj: { id: ids }, type },
    });
  };

  // 跳转详情页
  const goDetails = (ids, title) => {
    history.push({ pathname: `/classify/details/${ids}/${title}` });
  };

  useEffect(() => {
    getClassifyDetails();
    getClassifyDetailsFooterList();
  }, [id]);

  useEffect(() => {
    setBg(false);
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

  return (
    <div
      className={
        classType ? styles.classifyDetailsMobile : styles.classifyDetails
      }
    >
      {loading ? (
        <div className={styles.loadingBox}>
          <LoadingCard />
        </div>
      ) : Object.keys(data).length ? (
        <>
          <div className={styles.header}>
            <div className={styles.list_item_title}>{data.title}</div>
            <div className={styles.list_item_info}>
              <div className={styles.list_item_type}>
                <SysIcon className={styles.icon} type="icon-biaoqian" />
                <span
                  className={styles.list_item_type_item}
                  onClick={() => goClassifyList(data.classify_id, 'one')}
                >
                  {data.classify}
                </span>
                |
                <span
                  className={styles.list_item_type_item}
                  onClick={() => goClassifyList(data.classify_sub_id, 'two')}
                >
                  {data.classify_sub}
                </span>
              </div>
              <div className={styles.list_item_time}>
                <SysIcon className={styles.icon} type="icon-a-shijianzuijin" />
                发布于{data.time_str} 最近修改{data.last_edit_time}
              </div>
            </div>
          </div>
          <div className={styles.content}>
            {data.storage_type === 'md' && (
              <RanderMarkdown markdown={data.content} />
            )}
            {data.storage_type === 'html' && (
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.content ? stringReplace(data.content) : '暂无',
                }}
              />
            )}
          </div>
          <div className={styles.footer}>
            <Permit />
            <div className={styles.prev_next}>
              <div
                className={styles.prev}
                onClick={() =>
                  footerList[0]?.obj.id &&
                  goDetails(footerList[0]?.obj.id, footerList[0]?.obj.title)
                }
              >
                <div className={styles.prev_title}>上一篇</div>
                <div className={styles.prev_content}>
                  {footerList[0]?.obj.id ? footerList[0]?.obj.title : '没有了'}
                </div>
              </div>
              <div
                className={styles.next}
                onClick={() =>
                  footerList[1]?.obj.id &&
                  goDetails(footerList[1]?.obj.id, footerList[0]?.obj.title)
                }
              >
                <div className={styles.next_title}>下一篇</div>
                <div className={styles.next_content}>
                  {footerList[1]?.obj.id ? footerList[1]?.obj.title : '没有了'}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.loadingBox}>
          <EmptyCard />
        </div>
      )}
      <BackTopCom visibilityHeight={100} target={() => layoutContent} />
    </div>
  );
};

export default ClassifyDetails;
