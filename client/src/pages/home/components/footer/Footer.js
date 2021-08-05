/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-09 07:11:30
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-02 17:42:55
 */
import React, { Component } from 'react';
import "./footer.scss"
import { Carousel } from 'antd';
import { inject } from 'mobx-react';

const contentStyle = {
    height: '100px',
    color: '#fff',
    lineHeight: '100px',
    textAlign: 'center',
};

@inject('home')
class Footer extends Component {
    state = {
        excerptList: [],  //摘抄列表
        footerRouter: []   //底部路由列表
    }

    componentDidMount() {
        this.init();
    }

    async init() {
        let { domainStore } = this.props.home;

        await domainStore.setHomeFooter();

        this.setState({
            excerptList: domainStore.excerptList,
            footerRouter: domainStore.footerRouter
        })
    }

    render() {
        let { excerptList, footerRouter } = this.state;
        return (
            <div className="footer">
                <div className="content">
                    <div className="footer-carousel">
                        <Carousel autoplay dotPosition='left' dots={false}>
                            {
                                excerptList[0] && excerptList.map(item => (
                                    <div key={item.id}>
                                        <h3 style={contentStyle}>{item.text}</h3>
                                    </div>
                                ))
                            }
                        </Carousel>
                    </div>
                    <div className="tags">
                        {
                            footerRouter[0] && footerRouter.map(item => (
                                <a className="tagItem" key={item.id} href={item.path}>
                                    {item.text}
                                </a>
                            ))
                        }
                    </div>
                </div>
                <div className="bg"></div>
            </div>
        );
    }
}

export default Footer;