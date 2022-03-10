/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-03-10 16:58:45
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-03-10 16:58:46
 */
import React from 'react';
import { KeepAlive, history } from 'umi';
import Page from './index';

// 不要直接在上方page组件中包裹KeepAlive，会出问题，要以下面的方式去导出
export default () => {
  return (
    <KeepAlive
      saveScrollPosition="screen" //自动保存共享屏幕容器的滚动位置
      id={history.location.search || history.location.pathname} // 根据参数去缓存，如果参数不同就缓存多份，如果参数相同就使用同一个缓存。这样解决了传参改变时，页面不刷新的问题
      when={() => {
        // 根据路由的前进和后退状态去判断页面是否需要缓存，前进时缓存，后退时不缓存（卸载）。 when中的代码是在页面离开（卸载）时触发的。
        return history.action != 'POP'; //true卸载时缓存，false卸载时不缓存
      }}
    >
      <Page />
    </KeepAlive>
  );
};
