/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-29 11:06:42
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-04-27 00:03:08
 */
import React, { useEffect, useState, useRef } from 'react';
import { useSize } from 'ahooks';
import { message } from 'antd';
import moment from 'moment';
import api from '@/api';
import BackTopCom from '@/components/BackTopCom';
import SysIcon from '@/components/SysIcon';
import { stringReplaceP, distinctObjectMap } from '@/utils/dataUtils';
import { setBg, addLayoutNavStyle } from '@/utils/utils';
import { getGlobalUserData } from '@/utils/globalDataUtils';
import { secretGuide } from '@/utils/desc';
import styles from './index.less';

const { secret } = api;

const Secret = () => {
  // 获取当前窗口大小
  const size = useSize(document.body);
  // 样式类型
  const [classType, setClassType] = useState<number>(1);
  // 当前的时间
  const [time, setTime] = useState<string>(moment(new Date()).format('LTS'));
  // 获取作者信息
  const authorData = getGlobalUserData();
  // 当前页
  const [page, setPage] = useState<number>(1);
  // 每页条数
  const [page_size, setPageSize] = useState<number>(10);
  // 树洞列表
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);

  // mobile滚动盒子
  const content = useRef<any>(null);
  const contentScroll = useRef<any>(null);
  // pc滚动盒子
  const right = useRef<any>(null);
  const rightContent = useRef<any>(null);
  // 渲染列表
  const renderSecretList = () => {
    return list.map((item, index) => (
      <div className={styles.secret_item} key={index}>
        {classType && classType === 1 ? (
          index % 2 === 0 ? (
            <>
              <div className={styles.secret_item_content}>
                <div className={styles.secret_item_content_con}>
                  <div className={styles.secret_item_content_con_title}>
                    {item.type}-{item.time_str}
                  </div>
                  <div
                    className={styles.secret_item_content_con_txt}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </div>
                <div className={styles.secret_item_content_label}>
                  <SysIcon type="icon-yezi1" className={styles.icon} />
                </div>
              </div>
              <div className={styles.secret_item_null}></div>
            </>
          ) : (
            <>
              <div className={styles.secret_item_null}></div>
              <div className={styles.secret_item_content}>
                <div className={styles.secret_item_content_label}>
                  <SysIcon type="icon-yezi2" className={styles.icon} />
                </div>
                <div className={styles.secret_item_content_con}>
                  <div className={styles.secret_item_content_con_title}>
                    {item.type}-{item.time_str}
                  </div>
                  <div
                    className={styles.secret_item_content_con_txt}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </div>
              </div>
            </>
          )
        ) : (
          ''
        )}
        {classType === 2 || classType === 0 ? (
          <div className={styles.secret_item_content}>
            <div className={styles.secret_item_content}>
              <div className={styles.secret_item_content_label}>
                <SysIcon type="icon-yezi1" className={styles.icon} />
              </div>
              <div className={styles.secret_item_content_con}>
                <div className={styles.secret_item_content_con_title}>
                  {item.type}-{item.time_str}
                </div>
                <div
                  className={styles.secret_item_content_con_txt}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    ));
  };
  // 渲染loading
  const renderLoading = () => {
    return (
      <>
        {classType && classType === 1 ? (
          <div className={styles.secret_item} key={0}>
            <div className={styles.secret_item_null}></div>
            <div className={styles.secret_item_content}>
              <div className={styles.secret_item_content_label}>
                <SysIcon type="icon-pingguo" className={styles.icon} />
              </div>
              <div className={styles.secret_item_content_con}>
                <div className={styles.secret_item_content_con_loading}>
                  LOADING...
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
        {classType === 2 || classType === 0 ? (
          <div className={styles.secret_item}>
            <div className={styles.secret_item_content}>
              <div className={styles.secret_item_content}>
                <div className={styles.secret_item_content_label}>
                  <SysIcon type="icon-pingguo" className={styles.icon} />
                </div>
                <div className={styles.secret_item_content_con}>
                  <div className={styles.secret_item_content_con_loading}>
                    LOADING...
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </>
    );
  };

  // 获取树洞列表数据
  const getList = async () => {
    setLoading(true);
    await secret
      ._getSecretList({ params: { page, page_size } })
      .then(({ data }) => {
        if (data.code === 200) {
          setList((a) => distinctObjectMap([...a, ...data.data], 'id'));
          page === 1 && setTotalPages(data.meta.total_pages);
        }
      })
      .catch((error) => message.error(error))
      .finally(() => setLoading(false));
  };

  // 滚动事件
  const scrollFun = () => {
    const scrollBox = classType === 0 ? content.current : right.current;
    const scrollConBox =
      classType === 0 ? contentScroll.current : rightContent.current;

    const flag = page < totalPages;

    if (
      scrollConBox.offsetHeight -
        scrollBox.offsetHeight +
        40 -
        scrollBox.scrollTop <=
        300 &&
      !loading &&
      flag
    ) {
      setPage((data) => data + 1);
    }
  };

  // 初始化
  useEffect(() => {
    addLayoutNavStyle();
    setBg(false);
    const timerId = setInterval(() => {
      setTime(moment(new Date()).format('LTS'));
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);
  // 获取列表数据
  useEffect(() => {
    getList();
  }, [page]);
  // 监听页面宽度，设置样式
  useEffect(() => {
    if (size?.width && size?.width < 700) {
      setClassType(0);
    }
    if (size?.width && size?.width >= 700) {
      setClassType(1);
    }
    if (size?.width && size?.width <= 900 && size?.width >= 700) {
      setClassType(2);
    }
  }, [size?.width]);

  useEffect(() => {
    right.current.removeEventListener('scroll', scrollFun);
    content.current.removeEventListener('scroll', scrollFun);
    if (classType === 0) {
      content.current.addEventListener('scroll', scrollFun);
    } else {
      right.current.addEventListener('scroll', scrollFun);
    }
    return () => {
      content.current &&
        content.current.removeEventListener('scroll', scrollFun);
      right.current && right.current.removeEventListener('scroll', scrollFun);
    };
  }, [classType, page_size, page, totalPages, loading]);

  return (
    <div
      id="noselect"
      className={`${styles.secret} ${
        classType ? styles.secret_pc : styles.secret_mobile
      }`}
    >
      <div className={styles.content} ref={content}>
        <div className={styles.con} ref={contentScroll}>
          <div className={styles.left}>
            <div className={styles.time}>{time}</div>
            <div className={styles.left_con}>
              {stringReplaceP(authorData?.secret_guide || secretGuide).map(
                (item, index) => (
                  <p key={index}>{item}</p>
                ),
              )}
            </div>
            <div className={styles.left_bottom}>
              <div className={styles.left_bottom_border} />
              {authorData?.userName || '于风里读诗'}
            </div>
          </div>
          <div className={styles.right} ref={right}>
            <div
              className={`${styles.right_content} ${
                (classType === 2 || classType === 0) && styles.right_content_1
              }`}
              ref={rightContent}
            >
              {renderLoading()}
              {renderSecretList()}
            </div>
          </div>
        </div>
      </div>
      <BackTopCom
        visibilityHeight={100}
        target={() => content.current || window}
      />
    </div>
  );
};

export default Secret;
