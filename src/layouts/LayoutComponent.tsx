import React, { useEffect } from 'react';
import { Redirect } from 'umi';
import Nav from '@/components/Nav';
import Bg from '@/components/Bg/Img';
import * as authorityUtils from '@/utils/authorityUtils';
import { isFlagGetGlobalData, initGlobalData } from '@/utils/globalDataUtils';
import { getLayoutDom, getTheme } from '@/utils/utils';
import style from './index.less';

const LayoutPage = (props: any) => {
  const {
    children,
    location: { pathname },
    route,
  } = props;
  // 初始化获取权限
  !authorityUtils.getGlobalAuthorityModule() &&
    authorityUtils.initGlobalAuthority();

  // 初始化获取全局资源
  !isFlagGetGlobalData() && initGlobalData({});

  // 检查当前路由是否可以访问（或者有没有权限访问）
  const checkAuth = authorityUtils.matchingRoute(pathname, route) || '/404';

  // 判断children是否为空
  const childrenRender: React.ReactNode =
    typeof children === 'undefined' ? null : children;

  // 判断当前的路由是否重定向
  const Authorized = () => {
    if (checkAuth !== '403' && checkAuth !== '404') {
      return childrenRender;
    } else if (checkAuth === '403') {
      return <Redirect to={`/${checkAuth}`} />;
    } else {
      return <Redirect to={checkAuth} />;
    }
  };

  // 黑白切换
  const switchTheme = () => {
    document.documentElement.classList.toggle('dark');
    getTheme();
  };

  useEffect(() => {
    getTheme();
    getLayoutDom();
  }, []);

  return (
    <div className={style.pro_layout}>
      <Bg />
      <Nav {...props} switchTheme={switchTheme} />
      <div className={style.pro_layout_content} id="pro_layout_content">
        {Authorized()}
      </div>
    </div>
  );
};

export default LayoutPage;
