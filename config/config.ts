// https://umijs.org/config/
import { defineConfig } from 'umi';
import themeConfig from './themeConfig';
import proxy from './proxy';
import routes from './routes';

const { UMI_ENV } = process.env;

const devtoolMap = {
  dev: 'eval',
  test: 'source-map',
  pre: 'source-map',
  prod: 'hidden-source-map',
} as any;

export default defineConfig({
  /**
   * @desc 配置是否让生成的文件包含 hash 后缀，通常用于增量发布和避免浏览器加载缓存。
   */
  hash: true,
  /**
   * @desc 用户配置 sourcemap 类型
   * @type string
   * @params eval，最快的类型，但不支持低版本浏览器，如果编译慢，可以试试  source-map，最慢最全的类型
   */
  devtool: devtoolMap[UMI_ENV || 'dev'],
  /**
   * @desc 国际化配置语言
   */
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  publicPath: '/',
  antd: {},
  dva: {
    hmr: true,
  },
  /**
   * @desc 配置 history 类型和配置项
   * @type object
   * @params {type: 'browser'}
   */
  history: {
    type: 'browser',
  },
  /**
   * @desc 是否启用按需加载，即是否把构建产物进行拆分，在需要的时候下载额外的 JS 再执行。
   * @type object
   * @default false
   * 子配置项 loading, 类型为字符串，指向 loading 组件文件
   */
  dynamicImport: {
    loading: '@/components/LoadingCard',
  },
  /**
   * @desc 配置需要兼容的浏览器最低版本，会自动引入 polyfill 和做语法转换。
   * @type object
   * @default { chrome: 49, firefox: 64, safari: 10, edge: 13, ios: 10 }
   */
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: themeConfig,
  // 配置标题。
  title: '欢迎来到我的小站👏',
  // 忽略 moment 的 locale 文件，用于减少尺寸。
  ignoreMomentLocale: true,
  // 配置代理能力。
  proxy: proxy[UMI_ENV || 'dev'],
  /**
   * @desc 配置是否需要生成额外用于描述产物的 manifest 文件，默认会生成 asset-manifest.json
   * basePath，给所有文件路径加前缀
   */
  // manifest: {
  //   basePath: '/',
  // },
  extraPostCSSPlugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-px-to-viewport')({
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vh', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: [], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px`
    }),
  ],
  /**
   * 配置favicon图标
   */
  favicon: '/favicon.ico',
  // 快速刷新功能 https://umijs.org/config#fastrefresh
  fastRefresh: {},
  // esbuild: {},
  // 使用 webpack 5 代替 webpack 4 进行构建。
  // webpack5: {},
  // 配置是否开启服务端渲染，配置如下：
  // ssr: {
  //   // 更多配置
  //   // forceInitial: false,
  //   // removeWindowInitialProps: false
  //   // devServerRender: true,
  //   // mode: 'string',
  //   // staticMarkup: false,
  // }
});
