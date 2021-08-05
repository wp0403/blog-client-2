/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-04 07:10:50
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-04 17:00:24
 */
import { observable, action, makeAutoObservable } from 'mobx';
import api from '../../api';
import { message } from 'antd';

let { project } = api;

class UIStore {
    @observable x = 0;

    @action setX = () => {
        this.x++;
    }
}

class DomainStore {
    @observable homeRouter = [];  //主页路由
    @observable project_list = [];  //项目列表

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

    @action setProjectList = async () => {
        let { data } = await project._getProjectList();

        if (data.code === 200) {
            this.project_list = data.data;
            // message.success(data.msg);
        } else {
            console.log(data.data);
            message.error(data.msg);
        }
    }

    @action searchProject = async (text) => {
        let { data } = await project._searchProjectList({ params: { text } });

        if (data.code === 200) {
            this.project_list = data.data;
            // message.success(data.msg);
        } else {
            console.log(data.data);
            message.error(data.msg);
        }
    }
}

class Store {
    @observable uiStore = new UIStore();

    @observable domainStore = new DomainStore();
}

export default makeAutoObservable(new Store());