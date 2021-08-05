/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-08 20:58:13
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-03 22:58:54
 */
import React, { useState, useEffect } from 'react';
import "./header.scss";
import TextInput from '../text_input';
import { DownOutlined } from '@ant-design/icons';
import { inject,observer } from 'mobx-react';

const Header = observer(inject('home')((props) => {
    let [title, setTitle] = useState('主页标题');

    let [textarea, setTt] = useState('“种一棵树最好的时候是十年前，其次是现在。”');

    useEffect(() => {
        function setText() {
            let { title, tt } = props.home.domainStore.homeData;
            title && setTitle(title);
            tt && setTt(tt);
        }
        setText();
    }, [props.home.domainStore.homeData])

    return (
        <header className="header">
            <h2>{title}</h2>
            <TextInput
                id="autoText"
                timeStart={200}
                timeEnd={50}
                text={textarea}
            />
            <div className="scrollBtn">
                <DownOutlined onClick={props.goMain} />
            </div>
        </header>
    );
}));

export default Header;