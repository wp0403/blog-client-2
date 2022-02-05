/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-27 12:36:13
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-02-01 11:32:14
 */
import React, { useState, useEffect } from 'react';
import api from '@/api';
import LoadingCard from '@/components/LoadingCard';
import EmptyCard from '@/components/EmptyCard';
import styles from './index.less';

const { classify } = api;

const ClassifyDetails = (props: any) => {
  const {
    state: { id },
  } = props.location;
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

  useEffect(() => {
    getClassifyDetails();
  }, []);

  return (
    <div className={styles.classifyDetails}>
      {loading ? (
        <div className={styles.loadingBox}>
          <LoadingCard />
        </div>
      ) : Object.keys(data).length ? (
        <div className={styles.content}>
          {data.storage_type === 'md' && 111}
        </div>
      ) : (
        <div className={styles.loadingBox}>
          <EmptyCard />
        </div>
      )}
    </div>
  );
};

export default ClassifyDetails;
