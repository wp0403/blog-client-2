/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-02 22:03:00
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-04 10:57:07
 */
import { observable, action, makeAutoObservable } from 'mobx';
import api from '../../api';
import { message } from 'antd';

let { detail } = api;

class UIStore {
    @observable x = 0;

    @action setX = () => this.x++;
}

class DomainStore {
    @observable titleList = [];
    @observable essayObj = {};

    @action getTitleList = async () => {
        let { data } = await detail._getList();

        if (data.code === 200) {
            this.titleList = data.data;
            // message.success(data.msg);
        } else {
            console.log(data.data);
            message.error(data.msg);
        }
    }

    @action getEssayObj = async (obj) => {
        let { data } = await detail._getListObj({ params: obj });

        if (data.code === 200) {
            this.essayObj = data.data;
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