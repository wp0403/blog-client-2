/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-09 07:10:58
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-13 16:36:43
 */
import React, { Component } from 'react';
import "./main.scss";
import ListItem from '../listItem';
import Author from '../author';
import {withRouter} from 'react-router-dom';
import { NotificationOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';
import { inject } from 'mobx-react';

@inject('home')
class Main extends Component {
    state = {
        authorObj: {},  //作者信息
        list: [],   //文章列表
        listNum: 0,   //文章列表总数
        notice: "待发布公告信息。",  //公告
        pageSize: 1,
        pageNum: 5
    }
    componentDidMount() {
        this.init();
    }
    //初始化
    async init() {
        let { domainStore } = this.props.home;

        let { pageSize, pageNum } = this.state;

        await domainStore.setHomeMain({ pageSize, pageNum });

        let { authorObj, list, listNum } = domainStore;

        if (authorObj) {
            this.setState({
                authorObj,
                list,
                listNum,
                notice: authorObj.notice
            })
        }
    }
    //更改页
    async changePage() {
        let { domainStore } = this.props.home;

        let { pageSize, pageNum } = this.state;

        await domainStore.changePage({ pageSize, pageNum });

        let { list, listNum } = domainStore;

        if (list) {
            this.setState({
                list,
                listNum,
            });
            document.documentElement.scrollTop = 0;
        }
    }
    //跳转详情
    goDetail = (id) => {
        this.props.removeWinEvent();
        this.props.history.push({
            pathname:'/detail',
            state:{id}
        })
    }

    render() {
        let { authorObj, notice, list, pageSize, pageNum, listNum } = this.state;
        return (
            <div className="main">
                <div className="main_content">
                    <div className="main_left">
                        <div className="con">
                            {
                                list[0] &&
                                list.map(item => <ListItem goDetaill={this.goDetail} key={item.id} item={item} />)
                            }
                        </div>
                        <div className="page">
                            <Pagination
                                onChange={(page) => { this.setState({ pageSize: page }, this.changePage) }}
                                hideOnSinglePage={true}
                                current={pageSize}
                                total={listNum}
                                defaultPageSize={pageNum}
                            />
                        </div>
                    </div>
                    <div className="main_right">
                        <Author authorObj={authorObj} />
                        <div className="main_notice">
                            <div className="main_notice_title">
                                <NotificationOutlined className="main_notice_title_icon" />
                                <span className="main_notice_title_text">公告</span>
                            </div>
                            <div className="main_notice_text">
                                {notice}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Main);