/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-09 20:10:46
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-03 10:52:26
 */
import React, { Component } from 'react';
import "./author.scss";
import { GithubOutlined } from '@ant-design/icons';

class Author extends Component {
    state = {
        authorObj: {
            img: "https://wp-1302605407.cos.ap-beijing.myqcloud.com/img/src%3Dhttp_%252F%252Fn.sinaimg.cn%252Fsinakd20115%252F600%252Fw1920h1080%252F20210601%252F7b68-kquziik1524154.jpg%26refer%3Dhttp_%252F%252Fn.sinaimg.jpg",
            name: "作者",
            introduce: "简介描述信息",
            document: 10,
            classes: 6,
            github: ""
        }
    }

    componentDidMount(){
        let {authorObj} = this.props;
        authorObj && this.setState({
            authorObj,
        })
    }

    componentWillReceiveProps(nextprops) {
        let {authorObj} = nextprops;

        let flag = JSON.stringify(this.state.authorObj) !== JSON.stringify(authorObj);

        if (flag) {
            this.setState({
                authorObj: nextprops.authorObj
            })
        }
    }

    render() {
        let { authorObj } = this.state;
        return (
            <div className="home_author">
                <div className="home_author_imgBox">
                    <img src={authorObj.img} alt="" />
                </div>
                <div className="authorName">
                    {authorObj.name}
                </div>
                <div className="des">
                    {authorObj.introduce}
                </div>
                <div className="production">
                    <div className="document">
                        <span className="document_title">
                            文章
                        </span>
                        <span className="document_num">
                            {authorObj.document}
                        </span>
                    </div>
                    <div className="classes">
                        <span className="classes_title">
                            类别
                        </span>
                        <span className="classes_num">
                            {authorObj.classes}
                        </span>
                    </div>
                </div>
                <div className="github" onClick={() => window.location.href = `${authorObj.github}`}>
                    <GithubOutlined />
                    <span>delusion</span>
                </div>
            </div>
        );
    }
}

export default Author;