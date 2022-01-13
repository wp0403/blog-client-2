/*
 * @Descripttion: 此utils存放项目全局通用的事件和组件函数
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-13 11:29:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-13 15:37:12
 */

// 页面背景盒子
let bgDom: any = null;
// 全局滚动的盒子
let layoutContent: any = null;
// 全局导航盒子
let layoutNav: any = null;
// 滚动页面距离顶部的高度
let layoutContentTop: number = 0;

// 初始化获取全局元素
export const getLayoutDom = () => {
  bgDom = document.getElementById('layout_bg');
  layoutContent = document.getElementById('pro_layout_content');
  layoutNav = document.getElementById('layout_nav');
};

/**
 * 是否需要页面背景
 * @param {boolean} showBg
 */
export const setBg = (showBg: boolean) => {
  if (!bgDom) return;
  if (showBg) {
    bgDom.style.display = 'block';
  } else {
    bgDom.style.display = 'none';
  }
};
// 重置全局导航的样式
export const removeLayoutNavStyle = () => {
  layoutNav?.classList.remove('nav_active');
};
// 页面滚动事件
export const pageScroll = () => {
  if (layoutContent?.scrollTop && layoutContent?.scrollTop > 180) {
    layoutNav?.classList.add('nav_active');
  } else {
    layoutNav?.classList.remove('nav_active');
  }

  layoutContentTop = layoutContent?.scrollTop || 0;
};
// 设置页面滚动事件
export const bindHandleScroll = () => {
  if (layoutContent) {
    layoutContent.addEventListener('scroll', pageScroll, false);
  }
};
// 卸载页面滚动事件
export const removeScroll = () => {
  if (layoutContent) {
    layoutContent.removeEventListener('scroll', pageScroll, false);
  }
};
// 获取滚动元素距离页面顶部的高度
export const getLayoutConTop = (fn: Function) => {};
