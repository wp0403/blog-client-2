/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-09 17:27:04
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-03 07:34:03
 */
import React, { Component } from 'react';
import "./listItem.scss";
import { CalendarOutlined,ProfileOutlined } from '@ant-design/icons';

class ListItem extends Component {
    state = {
        item:{
            id:1,
            title:"标题",
            img:"https://wp-1302605407.cos.ap-beijing.myqcloud.com/img/src%3Dhttp_%252F%252Fn.sinaimg.cn%252Fsinakd20115%252F600%252Fw1920h1080%252F20210601%252F7b68-kquziik1524154.jpg%26refer%3Dhttp_%252F%252Fn.sinaimg.jpg",
            conText:"文档内容！！！！！！！！！！",
            dataTime:"2021-7-9",
            className:"类别"
        }
    }
    componentDidMount(){
        this.props.item && this.setState({item:this.props.item});
    }
    componentWillReceiveProps(nextProps){
        let prevProps = sessionStorage.getItem('home_list_item_prevProps',nextProps);
        
        sessionStorage.setItem('home_list_item_prevProps',JSON.stringify(nextProps));

        let flag = JSON.stringify(nextProps) !== prevProps;

        if (flag) {
            this.setState({
                item:nextProps.item
            })
        }
    }
    render() {
        let {item} = this.state;
        let {goDetaill} = this.props;
        return (
            <div className="list_item" onClick={()=>goDetaill(item.id)}>
                <div className="list_item_imgBox">
                    <img src={item.img} alt=""/>
                </div>
                <div className="list_item_right">
                    <div className="list_item_title">{item.title}</div>
                    <div className="list_item_dataTime">
                        <span><CalendarOutlined />{item.dataTime}</span>
                        <span><ProfileOutlined />{item.className}</span>
                    </div>
                    <div className="list_item_text">{item.conText}</div>
                </div>
            </div>
        );
    }
}

export default ListItem;