/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-13 09:41:18
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-15 15:55:09
 */
import React, { Component } from 'react'
import './classify.scss';
import Nav from '../../components/nav';
import Footer from '../../components/footer';
import { inject, observer } from 'mobx-react';

@inject('classify')
@observer
class Classify extends Component {
    state = {
        homeRouter: [],  //定义路由列表
        homeName: {},    //定义博客名称
        classifyList: [],
        currentList: [],
        id: 1
    }
    componentDidMount() {
        this.init();
        document.documentElement.scrollTop = 0;
    }

    init = async () => {
        window.addEventListener('scroll', this.handleScroll);

        let ids = (this.props.location.state?.id ? this.props.location.state.id : 1) * 1;

        let { id } = this.state;

        if (id !== ids) {
            this.setState({
                id: ids
            })
        }

        let { domainStore } = this.props.classify;

        await domainStore.setProjectRouter();
        await domainStore.setClassifyList();
        await this.getCurrentList();

        this.setState({
            classifyList: domainStore.classifyList
        })

        if (domainStore.homeRouter.length) {
            let homeRouter = domainStore.homeRouter.slice(0, domainStore.homeRouter.length - 1);
            let homeName = domainStore.homeRouter[domainStore.homeRouter.length - 1];

            this.setState({
                homeRouter,
                homeName
            })
        }
    }

    getCurrentList = async () => {
        let { id } = this.state;

        let { domainStore } = this.props.classify;

        await domainStore.setCurrentList(id);

        let { currentList } = domainStore;

        this.setState({
            currentList
        })
    }

    changeId = (classifyId) => {
        let { id } = this.state;

        if (id !== classifyId) {
            this.setState({
                id: classifyId
            }, this.getCurrentList);
        }
    }

    //跳转详情
    goDetail = (id) => {
        this.removeWinEvent();
        this.props.history.push({
            pathname: '/detail',
            state: { id }
        })
    }

    //监听scroll事件，判断回到顶部的显示隐藏
    handleScroll = () => {
        // console.log(document.documentElement.scrollTop, "top");
        if (document.documentElement.scrollTop > 200) {
            this.topNav.className = "topNav active";
        } else {
            this.topNav.className = "topNav";
        }
    }

    componentWillUnmount() {
        this.removeWinEvent();
        console.log(1);
    }

    //清除绑定事件
    removeWinEvent = () => {
        window.removeEventListener('scroll', this.handleScroll)
    }

    render() {
        let { homeRouter, homeName, classifyList, currentList, id } = this.state;
        return (
            <>
                <nav className="topNav" ref={c => this.topNav = c}>
                    <Nav homeRouter={homeRouter} homeName={homeName} />
                </nav>
                <div className="classify">

                    <div className="classify_header">
                        <div className="classify_header_bg"></div>
                        <div className="classofy_header_content">
                            <div className="classofy_header_content_top">
                                分&emsp;类
                        </div>
                            <div className="classofy_header_content_bottom">
                                {
                                    classifyList[0] && classifyList.map(item => (
                                        <div
                                            key={item.id}
                                            onClick={() => this.changeId(item.id)}
                                            className={id === item.id ? 'classofy_header_content_item active' : 'classofy_header_content_item'}
                                        >{item.typename}</div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="classify_main">
                        <div className="classify_main_content">
                            {
                                currentList[0] && currentList.map(item => (
                                    <div onClick={() => this.goDetail(item.id)} key={item.id} className="classify_main_content_item">
                                        <div className="classify_main_item_time">
                                            {item.dataTime}
                                        </div>
                                        <div className="classify_main_item_title">
                                            {item.title}
                                        </div>
                                        <div className="classify_main_item_fileType">
                                            数据类型：{item.fileType}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="classify_footer">
                        <Footer />
                    </div>
                </div>
            </>
        );
    }
}

export default Classify;
