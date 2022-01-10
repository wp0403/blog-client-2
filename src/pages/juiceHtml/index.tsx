/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-24 11:24:32
 * @LastEditors: WangPeng
 * @LastEditTime: 2021-12-24 11:41:03
 */
import React from 'react';
import juice from 'juice';

const emailHtml = `<div>111</div>`;

const index = () => {
  const result = juice(emailHtml);

  console.log(result);
  return <div></div>;
};

export default index;
