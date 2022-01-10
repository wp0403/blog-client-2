export default [
  {
    path: '/',
    component: '../layouts/layoutComponent',
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/home',
        name: '首页',
        component: './home',
      },
      {
        path: '/classify',
        name: '分类',
        component: './classify',
        routes: [
          {
            path: '/classify/projectLibrary',
            name: '项目库',
            component: './projectLibrary',
          },
          {
            path: '/classify/itinerary',
            name: '旅行日记',
            component: './itinerary',
          },
          {
            path: '/classify/secret',
            name: '树洞先生',
            component: './secret',
          },
        ],
      },
      {
        path: '/projectLibrary',
        name: '项目库',
        component: './projectLibrary',
        routes: [
          {
            path: '/projectLibrary/projectLibrary',
            name: '项目库',
            component: './projectLibrary',
          },
          {
            path: '/projectLibrary/itinerary',
            name: '旅行日记',
            component: './itinerary',
          },
          {
            path: '/projectLibrary/secret',
            name: '树洞先生',
            component: './secret',
          },
        ],
      },
      {
        path: '/itinerary',
        name: '旅行日记',
        component: './itinerary',
      },
      {
        path: '/secret',
        name: '树洞先生',
        component: './secret',
      },
      {
        path: '/resume',
        name: '个人简历',
        component: './resume',
        authority: 'resume@user',
      },
      {
        path: '/timeAxis',
        name: '时间轴',
        component: './timeAxis',
      },
      {
        path: '/about',
        name: '关于',
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
    ],
  },
];
