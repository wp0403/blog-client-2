/*
 * @Descripttion: 知识共享许可协议
 * @version:
 * @Author: WangPeng
 * @Date: 2022-02-10 14:02:51
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-03-15 17:06:34
 */

// https://creativecommons.org/choose/
import React from 'react';
import styles from './index.less';

const Permit = () => {
  return (
    <div className={styles.permit}>
      本作品采用
      <a
        rel="license"
        target="_blank"
        href="http://creativecommons.org/licenses/by/4.0/"
      >
        知识共享署名 4.0 国际许可协议
      </a>
      进行许可。
    </div>
  );
};

export default Permit;
