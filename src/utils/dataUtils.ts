import { cloneDeep } from 'lodash';

/**
 * 将字符串中的\n \r\n 空格 替换为html可识别的代码
 * 在需要的标签上添加如下属性
 * dangerouslySetInnerHTML={{__html: str ? stringReplace(str) : '',}}
 * @param {string} str
 */
export const stringReplace = (str: string) => {
  let newStr = cloneDeep(str);

  //替换所有的换行符
  newStr = newStr.replace(/\r\n/g, '<br>');
  newStr = newStr.replace(/\n/g, '<br>');

  //替换所有的空格（中文空格、英文空格都会被替换）
  newStr = newStr.replace(/\s/g, '&nbsp;');

  return newStr;
};

/**
 * 去掉所有的空格、回车换行符
 * @param {string} str
 */
export const stringRemove = (str: string) => {
  let newStr = cloneDeep(str);

  //替换所有的换行符
  newStr = newStr.replace(/\r\n/g, '');
  newStr = newStr.replace(/\n/g, '');

  //替换所有的空格（中文空格、英文空格都会被替换）
  newStr = newStr.replace(/\s/g, '');

  return newStr;
};

/**
 * 阻止冒泡
 * @param {Event} e
 */
export const stopPropagation = (e: Event) => {
  e = e || window.event;
  if (e.stopPropagation) {
    // W3C阻止冒泡方法
    e.stopPropagation();
  } else {
    e.cancelBubble = true; // IE阻止冒泡方法
  }
};
