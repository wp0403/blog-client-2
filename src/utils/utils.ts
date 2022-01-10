// 是否需要页面背景
export const setBg = (showBg: boolean) => {
  const bgDom = document.getElementById('layout_bg');

  if (!bgDom) return;
  if (showBg) {
    bgDom.style.display = 'block';
  } else {
    bgDom.style.display = 'none';
  }
};
// 重置全局导航的样式
export const removeLayoutNavStyle = () => {
  // 全局导航盒子
  const layoutNav = document.getElementById('layout_nav');
  layoutNav?.classList.remove('nav_active');
};
// 页面滚动事件
export const pageScroll = () => {
  // 全局内容盒子
  const layoutContent = document.getElementById('pro_layout_content');
  // 全局导航盒子
  const layoutNav = document.getElementById('layout_nav');

  if (layoutContent?.scrollTop && layoutContent?.scrollTop > 180) {
    layoutNav?.classList.add('nav_active');
  } else {
    layoutNav?.classList.remove('nav_active');
  }
};
// 设置页面滚动事件
export const bindHandleScroll = () => {
  // 滚动盒子
  const target = document.getElementById('pro_layout_content');

  if (target) {
    target.addEventListener('scroll', pageScroll, false);
  }
};
// 卸载页面滚动事件
export const removeScroll = () => {
  // 滚动盒子
  const target = document.getElementById('pro_layout_content');
  if (target) {
    target.removeEventListener('scroll', pageScroll, false);
  }
};
