/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-03 23:19:33
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-04 09:29:50
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import './nav.scss';

const Nav = (props) => {
    return (
        <>
            {
                props.homeName.path && (<span className="goHome">
                    <NavLink to={props.homeName.path}>
                        {props.homeName.pathname}
                    </NavLink>
                </span>)
            }
            <div className="topNav_right">
                {
                    props.homeRouter[0] && props.homeRouter.map(item => {
                        return <span
                            className="topNav_item"
                            key={item.id}
                        >
                            <NavLink to={item.path}>{item.pathname}</NavLink>
                        </span>
                    })
                }
            </div>
        </>
    );
};

export default Nav;