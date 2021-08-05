/*
 * @Descripttion: 打字组件
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-07-08 16:49:56
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-03 10:29:14
 */
import React, { Component } from 'react';
import "./text_input.scss";

class Text_input extends Component {
    state = {
        text: "",  //当前显示的文字
        textArr: [],  //全部文字的数组
        i: 0,  //当前文字项
        timerId: undefined,  //定时器id
        flag: true,  //控制文字加减
        times: 300, //打字间隔时间
    }

    componentDidMount() {
        this.props.text && this.init(this.props);
    }

    componentWillReceiveProps(nextprops) {
        let flag = sessionStorage.getItem('text') === nextprops.text;
        if (!flag) {
            this.init(nextprops);
        }
    }

    componentWillUnmount() {
        let { timerId } = this.state;
        timerId && clearInterval(timerId);
    }

    init(obj) {
        let { text, timeStart } = obj;
        this.setState({
            textArr: text ? text.split("") : "请传入一段文字！".split(""),
            times: timeStart ? timeStart : 300,
            i: 0,
            flag: true,
            text: "",
        }, () => {
            this.timer();
        });
    }

    timer = () => {
        let { timerId, times, textArr, flag, i } = this.state;
        let { timeStart, timeEnd } = this.props;
        timerId && clearInterval(timerId);

        sessionStorage.setItem('text',textArr.join(''));

        const timerFun = () => {
            this.setState({
                text: textArr.slice(0, i).join("")
            });
            if (flag) {
                i >= textArr.length
                    ?
                    this.setState({
                        flag: false,
                        times: timeEnd,
                        i: i--
                    }, () => {
                        this.timer();
                    })
                    :
                    this.setState({
                        i: i++
                    });
                return;
            } else {
                i <= 0 ?
                    this.setState({
                        flag: true,
                        times: timeStart
                    }, () => {
                        this.timer();
                    })
                    :
                    this.setState({
                        i: i--
                    });
            }
        }

        this.setState({
            timerId: setInterval(timerFun, times)
        })
    }

    render() {
        let { text } = this.state;
        return (
            <div className="text-input">
                <span className="text-box">
                    {text}
                    <span className="text-focus"></span>
                </span>
            </div>
        );
    }
}

export default Text_input;