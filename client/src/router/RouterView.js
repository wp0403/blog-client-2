/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-07-30 22:35:54
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-03 14:33:36
 */
import React from 'react';
import {Switch,Redirect,Route} from 'react-router-dom';

const RouterView = ({routerList}) => {
    if(!routerList){
        return ;
    }

    let routes = routerList.filter(item => item.path);
    let redirect = routerList.filter(item => item.to)[0];

    return (
        <Switch>
            {
                routes && routes.map((item,index)=><Route key={index} path={item.path} render={(props)=>{
                    let Com = item.component;
                    if(item.children){
                        return <Com {...props} routerList={item.children} />
                    }
                    return <Com {...props} />
                }} />)
            }
            {
                redirect && <Redirect to={redirect.to} from={redirect.from} />
            }
        </Switch>
    );
};

export default RouterView;