/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-08 09:23:32
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-15 15:51:21
 */
import React, { Component } from 'react';
import "./home.scss";
import { ArrowUpOutlined } from '@ant-design/icons';
import Header from './components/header';
import Main from './components/main';
import Footer from '../../components/footer';
import Nav from '../../components/nav';
import Bg from '../../components/bg/Home_backfround2';
import { inject } from 'mobx-react';

@inject("home")
class Home extends Component {
    state = {
        homeRouter: [],
        timerId: undefined,
        times: 1000 / 600,
        homeName: {
            id: 1,
            pathname: "主页名称",
            path: "/"
        }
    }
    componentDidMount() {
        this.getInit();
        document.documentElement.scrollTop = 0;
    }

    //初始化
    getInit = async () => {
        window.addEventListener('scroll', this.handleScroll);

        let { domainStore } = this.props.home;

        await domainStore.setHome();

        if (domainStore.homeData.id) {
            let homeRouter = domainStore.homeRouter.slice(0, domainStore.homeRouter.length - 1);
            let homeName = domainStore.homeRouter[domainStore.homeRouter.length - 1];
            this.setState({
                homeRouter,
                homeName
            });
        }
    }

    //监听scroll事件，判断回到顶部的显示隐藏
    handleScroll = () => {
        // console.log(document.documentElement.scrollTop, "top");
        // console.log( this.goTop,this.topNav);
        if (document.documentElement.scrollTop > 200) {
            this.goTop.className = "goTop active";
            this.topNav.className = "topNav active";
        } else {
            this.goTop.className = "goTop";
            this.topNav.className = "topNav";
        }
    }

    //去到main的位置
    goMain = () => {
        let { timerId, times } = this.state;
        let scrollTop = document.documentElement.clientHeight;
        timerId && clearInterval(timerId);
        this.setState({
            timerId: setInterval(() => {
                if (document.documentElement.scrollTop <= scrollTop - 5) {
                    document.documentElement.scrollTop += scrollTop / 120;
                } else {
                    document.documentElement.scrollTop = scrollTop;
                    clearInterval(this.state.timerId);
                }
            }, times)
        })
    }

    //回到顶部
    goHeader = () => {
        let { timerId, times } = this.state;
        let scrollTop = document.documentElement.scrollTop;
        timerId && clearInterval(timerId);
        this.setState({
            timerId: setInterval(() => {
                if (document.documentElement.scrollTop > 0) {
                    document.documentElement.scrollTop -= scrollTop / 60;
                } else {
                    document.documentElement.scrollTop = 0;
                    clearInterval(this.state.timerId);
                }
            }, times)
        })
    }

    //清除绑定事件
    removeWinEvent = () => {
        window.removeEventListener('scroll', this.handleScroll)
    }

    render() {
        let { homeRouter, homeName } = this.state;
        return (
            <>
                <div className="home">
                    <div className="bg">
                        <Bg />
                    </div>

                    <Header goMain={this.goMain} />
                    <Main removeWinEvent={this.removeWinEvent} />
                    <div className="main_footer">
                        <Footer />
                        <div className="main_footer_bg"></div>
                    </div>

                </div>
                <nav className="topNav" ref={c => this.topNav = c} onClick={this.removeWinEvent}>
                    <Nav homeRouter={homeRouter} homeName={homeName} />
                </nav>
                <div className="goTop" ref={b => this.goTop = b} onClick={this.goHeader}>
                    <ArrowUpOutlined />
                </div>
            </>
        );
    }
}

export default Home;