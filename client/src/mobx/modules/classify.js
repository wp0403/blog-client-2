/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-13 09:47:21
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-13 12:14:25
 */
import {observable,action,makeAutoObservable} from 'mobx';
import api from '../../api';
import { message } from 'antd';

let { classify,project } = api;

class UIStore{
    @observable x = 0;

    @action chnageX = () => {
        this.x++;
    }
}

class DomainStore{
    @observable homeRouter = [];  //主页路由
    @observable classifyList = []; //类别列表
    @observable currentList = [];  //当前类别下的文章列表

    @action setProjectRouter = async () => {
        let { data } = await project._getProjectRouter();

        if (data.code === 200) {
            this.homeRouter = data.data;
            // message.success(data.msg);
        } else {
            console.log(data.data);
            message.error(data.msg);
        }
    }

    @action setClassifyList = async () => {
        let {data} = await classify._getClassifyList();

        if (data.code === 200) {
            this.classifyList = data.data;
            // message.success(data.msg);
        } else {
            console.log(data.data);
            message.error(data.msg);
        }
    }

    @action setCurrentList = async (id) => {
        let {data} = await classify._getCurrentList({params:{id}});

        if (data.code === 200) {
            this.currentList = data.data;
            // message.success(data.msg);
        } else {
            console.log(data.data);
            message.error(data.msg);
        }
    }
}

class Store{
    @observable uiStore = new UIStore();
    @observable domainStore = new DomainStore();
}

export default makeAutoObservable(new Store());