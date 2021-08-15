/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-02 14:40:19
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-15 15:52:59
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './detail.scss';
import ReactMarkdown from 'react-markdown'
import { CalendarOutlined, ProfileOutlined } from '@ant-design/icons';
import Nav from '../../components/nav';
import Footer from '../../components/footer';
// import '../../css/mint.css';

@inject('detail')
@observer
class Detail extends Component {
    state = {
        homeRouter: [],  //定义路由列表
        homeName: {},    //定义博客名称
        id: "",
        essayList: [],
        essayObj: {},
        tabInd: 0
    }
    componentDidMount() {
        this.init();
    }

    async init() {
        window.addEventListener('scroll', this.handleScroll);

        let id = this.props.location.state?.id ? this.props.location.state.id : '1';

        let { domainStore } = this.props.detail;

        await domainStore.getTitleList();
        await domainStore.setProjectRouter();
        await domainStore.getEssayObj({ id });

        let { titleList, essayObj } = domainStore;

        let ind = titleList.findIndex(item => item.id === essayObj.id);

        this.setState({
            id,
            essayObj,
            essayList: titleList,
            tabInd: ind
        });

        if (domainStore.homeRouter.length) {
            let homeRouter = domainStore.homeRouter.slice(0, domainStore.homeRouter.length - 1);
            let homeName = domainStore.homeRouter[domainStore.homeRouter.length - 1];

            this.setState({
                homeRouter,
                homeName
            })
        }
    }

    changeId = async (id) => {
        document.documentElement.scrollTop = 0;

        let { domainStore } = this.props.detail;

        await domainStore.getEssayObj({ id });

        let { essayObj, titleList } = domainStore;
        let ind = titleList.findIndex(item => item.id === essayObj.id);

        this.setState({
            id,
            essayObj,
            tabInd: ind
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
    }

    //清除绑定事件
    removeWinEvent = () => {
        window.removeEventListener('scroll', this.handleScroll)
    }

    goClassify = (id) => {
        this.removeWinEvent();
        this.props.history.push({
            pathname: '/classify',
            state: { id }
        })
    }

    render() {
        let { essayObj, essayList, tabInd, homeRouter, homeName } = this.state;

        return (
            <>
                <nav className="topNav" ref={c => this.topNav = c}>
                    <Nav homeRouter={homeRouter} homeName={homeName} />
                </nav>
                <div className="detail">
                    <div className="detail_header">
                        <div className="detail_header_back" style={{ backgroundImage: `url(${essayObj.img})` }} />
                        <div className="detail_header_content">
                            {
                                essayObj.title && (<>
                                    <div className="detail_header_content_title">
                                        {essayObj.title}
                                    </div>
                                    <div className="detail_header_content_xinxi">
                                        <span><CalendarOutlined />{essayObj.dataTime}</span>|
                                    <span
                                            className="detail_header_content_xinxi_class"
                                            onClick={() => this.goClassify(essayObj.class)}
                                        >
                                            <ProfileOutlined />
                                            {essayObj.className}
                                        </span>
                                    </div>
                                    <div className="detail_header_time">
                                        发布时间：{essayObj.dataTime}
                                    </div>
                                </>)
                            }
                        </div>
                        <div className="detail_header_box"></div>
                    </div>
                    <div className="detail_main">
                        <div className="detail_center">
                            {
                                essayObj.id && (<div ref={c => this.center = c}>
                                    <div className="detail_main_content">
                                        {
                                            essayObj.fileType === 'html'
                                            && <div className="_html" dangerouslySetInnerHTML={{ __html: essayObj.conText }} />
                                        }
                                        {
                                            essayObj.fileType === 'md'
                                            && <ReactMarkdown>{essayObj.conText}</ReactMarkdown>
                                        }
                                    </div>

                                </div>)
                            }
                            {
                                !essayObj.id && <div>暂无数据</div>
                            }
                        </div>
                        <div className="detail_main_nav">
                            {
                                essayList[tabInd - 1] &&
                                <div className="detail_main_nav_left" onClick={() => this.changeId(essayList[tabInd - 1].id)}>
                                    <span className="detail_main_nav_item">上一篇</span>
                                    <span className="detail_main_nav_item_title">{essayList[tabInd - 1].title}</span>
                                </div>
                            }
                            {
                                !essayList[tabInd - 1] && <span className="detail_main_nav_item_title">已是首篇</span>
                            }
                            {
                                essayList[tabInd + 1] &&
                                <div className="detail_main_nav_right" onClick={() => this.changeId(essayList[tabInd + 1].id)}>
                                    <span className="detail_main_nav_item">下一篇</span>
                                    <span className="detail_main_nav_item_title">{essayList[tabInd + 1].title}</span>
                                </div>
                            }
                            {
                                !essayList[tabInd + 1] && <span className="detail_main_nav_item_title">已是最后一篇</span>
                            }
                        </div>
                    </div>
                    <div className="detail_footer">
                        <Footer />
                    </div>
                </div>
            </>
        )
    }
}

export default Detail;