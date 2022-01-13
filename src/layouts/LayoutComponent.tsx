import React, { useEffect, useState, useRef } from 'react';
import { Redirect } from 'umi';
import BackTopCom from '@/components/BackTopCom';
import Nav from '@/components/Nav';
import Bg from '@/components/Bg/Img';
import * as authorityUtils from '@/utils/authorityUtils';
import { getLayoutDom } from '@/utils/utils';
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

  const backTop = useRef(null);

  useEffect(() => {
    getLayoutDom();
  });

  return (
    <div className={style.pro_layout} ref={backTop}>
      <Bg />
      <Nav {...props} />
      <div className={style.pro_layout_content} id="pro_layout_content">
        {Authorized()}
      </div>
      <BackTopCom target={() => backTop.current as any} visibilityHeight={50} />
    </div>
  );
};

export default LayoutPage;
