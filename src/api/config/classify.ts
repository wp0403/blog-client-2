/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-13 09:59:41
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-02-11 11:02:30
 */
//获取一级类别博文列表
export const _getClassifyList = {
  url: '/api/getClassifyList',
  method: 'get',
};
//获取二级类别博文列表
export const _getClassifySubList = {
  url: '/api/getClassifySubList',
  method: 'get',
};
//获取博文详情
export const _getClassifyDetails = {
  url: '/api/getClassifyDetails',
  method: 'get',
};
//获取博文详情的上一条和下一条列表
export const _getClassifyDetailsFooter = {
  url: '/api/getClassifyDetailsFooter',
  method: 'get',
};
