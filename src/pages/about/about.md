# 关于

本网站完全由于风里读诗本人编写，保留所有权利，如要使用，请联系本人。

### 初衷

在博客框架比比皆是的现在，我为什么费力自己去搞一个框架呢？在我接触到的博客框架中，大多数使用的是配置式的编写方式，而对于不熟悉的人来说，查阅文档是必不可少的，而且博客页面千篇一律。我自己的考虑是，

- 1.灵活，我可以对于自己的页面随意设计，添加自己想要的任何功能及页面；
- 2.学习，在编写的过程中，我从全局布局开始，到路由，到鉴权，完全自己从零开始，使我在开发中，学到了很多东西，全局的信息缓存，权限管理，全局函数的编写，都得到了很大的提高；
- 3.实现一个从前端到后端，数据库，以及后台管理的完整阶段，我打算在后台管理使用 vue3，这样更能完备自己的前端知识体系，以及在后台程序编写时，提高自己的逻辑思维能力。

### 过程中遇到的问题

- 1.在编写过程中，关于全局布局，我自己整了很久，导航组件的编写，全局元素的事件管理，为此，我专门写了一个全局元素的 utils 文件，这样方便我在每个页面管理对应的样式以及事件等。

- 2.在回到顶部组件编写时，我使用 antd 自带的组件，发现不太适用我的项目，所以自己着手编写了一个组件，发现如果使用纯 js 加定时器的方法，页面总会有些卡顿，然后我去借鉴了一下 antd 的 BackTop 组件源码，发现了很多新的知识，缓动函数，antd 的 throttleByAnimationFrame 函数，对于浏览器的动画渲染机制也有了一些了解。