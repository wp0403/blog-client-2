/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2022-01-22 13:20:17
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-04-27 23:23:40
 */
export default [
  {
    path: '/',
    component: '../layouts/LayoutComponent',
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/home',
        name: '首页',
        exact: true,
        component: './home',
        // routes: [{ path: '/home', name: '二级标题' }],
      },
      {
        path: '/classify',
        name: '分类',
        exact: true,
        component: './classify',
      },
      {
        path: '/classify/list/:id/:type',
        exact: true,
        component: './classify-list',
      },
      {
        path: '/classify/details/:id/:title',
        component: './classify-details',
      },
      {
        path: '/projectLibrary',
        name: '项目库',
        exact: true,
        component: './projectLibrary',
        routes: [],
        authority: 'resume@user',
      },
      {
        path: '/itinerary',
        name: '旅行日记',
        exact: true,
        component: './itinerary',
      },
      {
        path: '/itinerary/details/:id',
        exact: true,
        component: './itinerary-details',
      },
      {
        path: '/secret',
        name: '树洞先生',
        exact: true,
        component: './secret',
      },
      {
        path: '/resume',
        name: '个人简历',
        exact: true,
        component: './resume',
        authority: 'resume@user',
      },
      {
        path: '/timeAxis',
        name: '时间轴',
        exact: true,
        component: './timeAxis',
        authority: 'resume@user',
      },
      {
        path: '/about',
        name: '关于',
        exact: true,
        component: './about',
      },
      {
        // 工具页面 转html+css为html+行内
        path: '/juice',
        component: './juiceHtml',
        authority: 'juice@user',
      },
      {
        path: '/403',
        component: '@/pages/error/403',
      },
      {
        path: '/404',
        component: '@/pages/error/404',
      },
      {
        path: '/500',
        component: '@/pages/error/500',
      },
      {
        path: '/sitemap',
        component: '@/pages/websiteConfig/sitemap',
      },
    ],
  },
];
