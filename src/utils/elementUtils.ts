/*
 * @Descripttion: 此utils存放元素通用的utils方法
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-13 11:42:16
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-13 14:07:22
 */

/**
 * 判断是否为window对象
 * @param {any} obj
 * @returns {boolean}
 */
export const isWindow = (obj: any) => {
  return obj !== null && obj !== undefined && obj === obj.window;
};

/**
 * 获取滚动元素距离顶部/左侧的距离
 * @param {HTMLElement | Window | Document | null} target 当前滚动的元素
 * @param {boolean} top 是否为纵向滚动，否则为横向滚动
 * @returns {number} 返回距离顶部/左侧的距离
 */
export const getScroll = (
  target: HTMLElement | Window | Document | null,
  top: boolean,
): number => {
  if (typeof window === 'undefined') {
    return 0;
  }
  const method = top ? 'scrollTop' : 'scrollLeft';
  let result = 0;
  if (isWindow(target)) {
    result = (target as Window)[top ? 'pageYOffset' : 'pageXOffset'];
  } else if (target instanceof Document) {
    result = target.documentElement[method];
  } else if (target) {
    result = (target as HTMLElement)[method];
  }
  if (target && !isWindow(target) && typeof result !== 'number') {
    result = ((target as HTMLElement).ownerDocument || (target as Document))
      .documentElement?.[method];
  }
  return result;
};
