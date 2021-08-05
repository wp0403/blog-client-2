/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-30 22:21:27
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-02 22:59:46
 */
const modelCreator = function () {
  const store = {};
  const context = require.context('./modules', false, /\.(js|ts)$/);
  const modelList = context.keys();
  modelList.forEach((model) => {
	  const newSpaces = model.match(/\/(\w+)\.js$/)[1];
    store[newSpaces] = context(model).default;
  });
  return store;
};

export default modelCreator();

