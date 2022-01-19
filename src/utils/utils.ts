/*
 * @Descripttion: 此utils存放项目全局通用的事件和组件函数
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-13 11:29:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-19 11:11:55
 */

// 页面背景盒子
let bgDom: any = null;
// 全局滚动的盒子
export let layoutContent: any = null;
// 全局导航盒子
export let layoutNav: any = null;

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
  if (!layoutNav) return;
  layoutNav?.classList.remove('nav_active');
};

// 设置全局导航样式
export const addLayoutNavStyle = () => {
  if (!layoutNav) return;
  layoutNav?.classList.add('nav_active');
};

// 页面滚动事件
export const pageScroll = () => {
  if (!layoutNav) return;
  if (layoutContent?.scrollTop && layoutContent?.scrollTop > 180) {
    layoutNav?.classList.add('nav_active');
  } else {
    layoutNav?.classList.remove('nav_active');
  }
};

// 设置页面滚动事件
export const bindHandleScroll = () => {
  if (!layoutContent) return;
  layoutContent.addEventListener('scroll', pageScroll, false);
};

// 卸载页面滚动事件
export const removeScroll = () => {
  if (!layoutContent) return;
  layoutContent.removeEventListener('scroll', pageScroll, false);
};
