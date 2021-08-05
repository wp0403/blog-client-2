/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-02 14:40:19
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-03 14:35:33
 */
import React, { Component } from 'react';
import { inject,observer } from 'mobx-react';
import './detail.scss';
import { BankOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';

@observer
@inject('detail')
class Detail extends Component {
    state = {
        id: "",
        leftList: [],
        essayObj: {}
    }
    componentDidMount() {
        this.init();
    }

    async init() {
        let id = this.props.location.state?.id?this.props.location.state.id:'1';

        let { domainStore } = this.props.detail;

        await domainStore.getTitleList();

        await domainStore.getEssayObj({id});

        let {titleList,essayObj} = domainStore;

        this.setState({
            id,
            essayObj,
            leftList: titleList
        });
    }

    changeId = async (id) => {
        let { domainStore } = this.props.detail;

        await domainStore.getEssayObj({id});

        let {essayObj} = domainStore;

        this.setState({
            id,
            essayObj
        })
    }

    render() {
        let { id, essayObj, leftList } = this.state;

        return (
            <div className="detaill">
                <div className="detaill_header">
                    <BankOutlined />
                    <Link to="/"><span className="navItem">Home</span></Link>/
                    <span className="navItem">detaill</span>/
                    <span className="navItem">{id}</span>
                </div>
                <div className="detaill_main">
                    <div className="detaill_left">
                        <div className="detaill_left_top">
                            目&emsp;录
                        </div>
                        <div className="detaill_left_certer">
                            <ul>
                                {
                                    leftList[0] && leftList.map(item => (
                                        <li
                                            onClick={() => this.changeId(item.id)}
                                            className={item.id === id ? 'active' : ''}
                                            key={item.id}
                                        >
                                            {item.title}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="detaill_left_bottom"></div>
                    </div>
                    <div className="detaill_center">
                        {
                            essayObj.id && (<div ref={c => this.center = c}>
                                <div className="detaill_main_title">
                                    <div className="title">{essayObj.title}</div>
                                    <div className="type">{essayObj.className}</div>
                                </div>
                                <div className="detaill_main_content">
                                    <div className="_html" dangerouslySetInnerHTML={{ __html: essayObj.conText }} />
                                </div>
                                <div className="img">
                                    <img src={essayObj.img} alt="" />
                                </div>
                                <div className="detaill_main_time">
                                    {essayObj.dataTime}
                                </div>
                            </div>)
                        }
                        <div className="detaill_main_bottom">

                        </div>
                    </div>
                    <div className="detaill_right">

                    </div>
                </div>
                <div className="detaill_footer">

                </div>
            </div>
        )
    }
}

export default Detail;