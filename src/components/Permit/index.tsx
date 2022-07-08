/*
 * @Descripttion: 知识共享许可协议
 * @version:
 * @Author: WangPeng
 * @Date: 2022-02-10 14:02:51
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-08-22 15:44:09
 */

// https://creativecommons.org/choose/
import React from 'react';
import styles from './index.less';

const Permit = () => {
  return (
    <div className={styles.permit}>
      <a
        rel="license"
        target="_blank"
        href="http://creativecommons.org/licenses/by-nc-nd/4.0/"
      >
        <img
          alt="知识共享许可协议"
          style={{ borderWidth: 0 }}
          src="https://wp-1302605407.cos.ap-beijing.myqcloud.com/permit.png"
        />
      </a>
      本作品采用
      <a
        rel="license"
        target="_blank"
        href="http://creativecommons.org/licenses/by-nc-nd/4.0/"
      >
        知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议
      </a>
      进行许可。
    </div>
  );
};

export default Permit;
