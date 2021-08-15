/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-30 22:34:59
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-13 09:40:46
 */
import Loadable from 'react-loadable';

const Loading = () => <span>Loading...</span>;

const Home = Loadable({
    loader: () => import('../pages/home'),
    loading: Loading,
});

const Detail = Loadable({
    loader: () => import('../pages/detail'),
    loading: Loading,
});

const Projects = Loadable({
    loader: () => import('../pages/projects'),
    loading: Loading,
});

const Map = Loadable({
    loader: () => import('../pages/projects/map'),
    loading: Loading,
});

const Classify = Loadable({
    loader: () => import('../pages/classify'),
    loading: Loading,
});

let routerList = [
    {
        path: "/home",
        component: Home,
    },
    {
        path:"/detail",
        component:Detail
    },
    {
        path:"/projects",
        component:Projects
    },
    {
        path:"/classify",
        component:Classify
    },
    {
        path:"/map",
        component:Map
    },
    {
        from: "/",
        to: "/home"
    }
];

export default routerList;