/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-07-30 22:34:43
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-03 14:49:12
 */
import {BrowserRouter} from 'react-router-dom';
import routerList from './routerConfig';
import RouterView from './RouterView';

const Router = function(){
    return (
        <BrowserRouter>
            <RouterView routerList={routerList} />
        </BrowserRouter>
    );
};

export default Router;