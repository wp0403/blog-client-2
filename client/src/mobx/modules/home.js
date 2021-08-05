/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-30 22:21:58
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-04 10:57:28
 */
import { observable, action, makeAutoObservable } from 'mobx';
import api from '../../api';
import { message } from 'antd';

let { home } = api;

class UIStore {
    @observable x = 0;

    @action setX = () => this.x++;
}

class DomainStore {
    @observable homeData = {};  //主页文字
    @observable homoRouter = [];  //主页路由
    @observable authorObj = [];  //博主信息
    @observable listNum = 0;  //文章列表总数
    @observable list = [];  //文章列表
    @observable excerptList = [];  //摘抄列表
    @observable footerRouter = [];   //底部路由列表

    @action setHome = async () => {
        let { data } = await home._getHomeText();

        if (data.code === 200) {
            this.homeData = data.data.homeData;
            this.homeRouter = data.data.homeRouter;
            // message.success(data.msg);
        } else {
            console.log(data.data);
            message.error(data.msg);
        }
    };

    @action setHomeMain = async (obj) => {
        let { data } = await home._getHomeMain({ params: obj });

        if (data.code === 200) {
            this.listNum = data.data.essayListCount;
            this.list = data.data.lists;
            this.authorObj = data.data.authorObj;
            // message.success(data.msg);
        } else {
            console.log(data.data);
            message.error(data.msg);
        }
    };

    @action changePage = async (obj) => {
        let { data } = await home._getHomeMainEssay({ params: obj });

        if (data.code === 200) {
            this.listNum = data.data.essayListCount;
            this.list = data.data.lists;
            // message.success(data.msg);
        } else {
            console.log(data.data);
            message.error(data.msg);
        }
    }

    @action setHomeFooter = async () => {
        let { data } = await home._getHomeFooter();


        if (data.code === 200) {
            let { excerpt, footerRouter } = data.data;
            this.excerptList = excerpt;
            this.footerRouter = footerRouter;
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