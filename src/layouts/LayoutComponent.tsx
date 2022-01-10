import React, { useEffect, useState } from 'react';
import { Redirect } from 'umi';
import BackTop from '@/components/BackTop';
import Nav from '@/components/Nav';
import Bg from '@/components/Bg/Img';
import * as authorityUtils from '@/utils/authorityUtil';
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

  const checkAuth = authorityUtils.matchingRoute(pathname, route) || '/404';

  const childrenRender: React.ReactNode =
    typeof children === 'undefined' ? null : children;

  const Authorized = () => {
    if (checkAuth !== '403' && checkAuth !== '404') {
      return childrenRender;
    } else if (checkAuth === '403') {
      return <Redirect to={`/${checkAuth}`} />;
    } else {
      return <Redirect to={checkAuth} />;
    }
  };

  return (
    <div className={style.pro_layout} id="backTop">
      <Bg />
      <Nav {...props} />
      <div className={style.pro_layout_content} id="pro_layout_content">
        {Authorized()}
      </div>
      <BackTop
        target={() => document.getElementById('backTop') as any}
        visibilityHeight={50}
      />
    </div>
  );
};

export default LayoutPage;
