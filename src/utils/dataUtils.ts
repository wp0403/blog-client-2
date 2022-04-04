/*
 * @Descripttion: 此utils存放数据操作的方法
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-13 11:42:16
 * @LastEditors: 王鹏
 * @LastEditTime: 2022-04-05 01:52:13
 */
import { message } from 'antd';
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
  newStr = newStr.replace(/\\r\\n/g, '<br>');
  newStr = newStr.replace(/\\n/g, '<br>');

  //替换所有的空格（中文空格、英文空格都会被替换）
  newStr = newStr.replace(/\s/g, '&nbsp;');

  return newStr;
};

export const stringReplaceP = (str: string) => {
  let newStr = cloneDeep(str);

  //替换所有的空格（中文空格、英文空格都会被替换）
  newStr = newStr.replace(/\s/g, '&nbsp;');

  return newStr.split('\\n');
};

/**
 * 去掉所有的空格、回车换行符
 * @param {string} str
 */
export const stringRemove = (str: string) => {
  let newStr = cloneDeep(str);

  //替换所有的换行符
  newStr = newStr.replace(/\\r\\n/g, '');
  newStr = newStr.replace(/\\n/g, '');

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

/**
 * 跳转登录邮箱
 */
export const signInEmail = (email) => {
  // 邮箱域
  const hash = {
    'qq.com': 'http://mail.qq.com',
    'gmail.com': 'http://mail.google.com',
    'sina.com': 'http://mail.sina.com.cn',
    '163.com': 'http://mail.163.com',
    '126.com': 'http://mail.126.com',
    'yeah.net': 'http://www.yeah.net/',
    'sohu.com': 'http://mail.sohu.com/',
    'tom.com': 'http://mail.tom.com/',
    'sogou.com': 'http://mail.sogou.com/',
    '139.com': 'http://mail.10086.cn/',
    'hotmail.com': 'http://www.hotmail.com',
    'live.com': 'http://login.live.com/',
    'live.cn': 'http://login.live.cn/',
    'live.com.cn': 'http://login.live.com.cn',
    '189.com': 'http://webmail16.189.cn/webmail/',
    'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
    'yahoo.cn': 'http://mail.cn.yahoo.com/',
    'eyou.com': 'http://www.eyou.com/',
    '21cn.com': 'http://mail.21cn.com/',
    '188.com': 'http://www.188.com/',
    'foxmail.com': 'http://www.foxmail.com',
    'outlook.com': 'http://www.outlook.com',
  };

  const _mail = email.split('@')[1]; //获取邮箱域

  const key = Object.keys(hash).find((item) => item === _mail);

  if (!key) return message.error('暂无该邮箱的跳转地址');

  window.open(hash[key]);
};

/**
 * 数组对象去重
 */
export const distinctObjectMap = (arr, type) => {
  const res = new Map();
  // 使用map记录下每个item的id，已存在的id将不会被筛选入内
  return arr.filter((item) => !res.has(item[type]) && res.set(item[type], 1));
};

// 计算方法，num为当前的数  rate为进率  digit为保留的小数位
export const calculation = (num, rate, digit) => {
  return parseFloat(`${(Math.trunc(num) / rate).toFixed(digit)}`);
};

// 对数据进行分类处理，arr为要分类的数据  type为以什么属性分类
export const modifyData = (data: any[], type) => {
  const newData = [] as any[];
  data.forEach((item, index) => {
    const ind = newData.findIndex((item1: any) => item1.type === item[type]);

    if (ind !== -1) {
      newData[ind].list.push(item);
    } else {
      newData.push({ id: index, type: item[type], list: [item] });
    }
  });

  return newData.map((item) => item.list).flat(Infinity);
};

// 对旅行日记列表进行处理
export const itineraryData = (data: any[]) => {
  const newData = [] as any[];
  data.forEach((item, index) => {
    const type = item['timeData'].split('/')[0];
    const ind = newData.findIndex((item1: any) => item1.type === type);

    const newItem = {
      ...item,
      imgs: item.imgs.map((v, i) => ({
        id: `${item.id}-${i}`,
        src: v,
      })),
    };

    if (ind !== -1) {
      newData[ind].list.push(newItem);
    } else {
      newData.push({ id: index, type, list: [newItem] });
    }
  });

  return newData;
};

// 对数据分组处理
export const groupingData = (data, num) => {
  const maxPage = Math.ceil(data.length / num);
  const newData = [] as any;

  if (!maxPage) return data;
  for (let i = 0; i < maxPage; i++) {
    newData.push({ id: i, list: data.slice(i * num, (i + 1) * num) });
  }

  return newData;
};
