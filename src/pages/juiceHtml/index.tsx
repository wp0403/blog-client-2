/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-24 11:24:32
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-03-22 16:43:22
 */
import React from 'react';
import juice from 'juice';

const emailHtml = `<div></div>`;

const index = () => {
  const result = juice(emailHtml);

  console.log(result);
  return <div></div>;
};

export default index;
