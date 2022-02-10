/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-27 12:36:13
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-02-10 18:12:09
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
  const {
    state: { id },
  } = props.location;
  // 获取当前窗口大小
  const size = useSize(document.body);
  // 样式类型
  const [classType, setClassType] = useState<number>(0);
  // 详情数据
  const [data, setData] = useState<any>({});
  // loading
  const [loading, setLoading] = useState<boolean>(false);
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

  // 跳转博文列表页
  const goClassifyList = (id, type) => {
    history.push({ pathname: '/classify/list', state: { obj: { id }, type } });
  };

  useEffect(() => {
    getClassifyDetails();
  }, []);

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
