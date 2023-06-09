/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2021-12-23 18:13:58
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-04-28 14:22:59
 */
import React, { useState, useEffect } from 'react';
import { history, Link } from 'umi';
import { Drawer } from 'antd';
import { useSize } from 'ahooks';
import { authRouterFilter, filterNoName } from '@/utils/authorityUtils';
import {
  removeLayoutNavStyle,
  layoutNav,
  setBg,
  layoutContent,
} from '@/utils/utils';
import SysIcon from '@/components/SysIcon';
import styles from './index.less';

interface Props {
  style?: React.CSSProperties;
  route: any;
  [key: string]: any;
}

const Nav = (props: Props) => {
  const {
    route,
    style,
    location: { pathname },
  } = props;

  // 过滤权限路由
  let routes = Array.isArray(authRouterFilter(route))
    ? authRouterFilter(route)
    : authRouterFilter(route)?.routes || [];

  // 过滤不需要展示的路由
  routes = filterNoName(routes);
  // 样式类型
  const [classType, setClassType] = useState<number>(1);
  // 主题类型
  const [theme, setTheme] = useState<boolean>(true);
  // 抽屉显隐
  const [visible, setVisible] = useState(false);
  // 显示抽屉
  const showDrawer = () => {
    setVisible(true);
    layoutNav.style.display = 'none';
  };
  // 隐藏抽屉
  const onClose = () => {
    setVisible(false);
    layoutNav.style.display = 'flex';
  };
  // 获取当前窗口大小
  const size = useSize(document.body);
  // 当前展示的一级路由
  const [routeItemInd, setRouteItemInd] = useState<number | null>(0);
  // 当前展示的二级路由
  const [subRouteItemInd, setSubRouteItemInd] = useState<number | null>(null);

  // 跳转路由
  const goToListPage = (
    path: string,
    index: number | null,
    ind: number | null,
  ) => {
    if (path === props.location.pathname) return;
    layoutContent.scrollTop = 0;
    // history.push(path);
    setRouteItemInd(index);
    setSubRouteItemInd(ind);
    removeLayoutNavStyle();
    setBg(true);
  };

  const renderLink = (v: any) => {
    return (
      <Link
        to={v.path}
        onClick={(e) => {
          if (v.path === props.location.pathname) {
            e.preventDefault();
          }
        }}
      >
        {v.name}
      </Link>
    );
  };

  // 监听页面宽度，设置导航样式
  useEffect(() => {
    if (size?.width && size?.width < 700) {
      setClassType(1);
    }
    if (size?.width && size?.width >= 700) {
      setClassType(0);
    }
  }, [size?.width]);

  // 根据当前地址栏匹配路由高亮
  useEffect(() => {
    const pathnameList = pathname.split('/').filter((ite) => ite);

    const searchRputeInd = () => {
      routes.forEach((item, index) => {
        const routeList = item.path.split('/').filter((ite) => ite);

        if (routeList[0] === pathnameList[0]) {
          setRouteItemInd(index);
        }

        if (pathnameList.length > 1) {
          item?.routes?.forEach((ite, ind) => {
            if (ite.path === pathname) {
              setSubRouteItemInd(ind);
            }
          });
        }
      });
    };

    searchRputeInd();
  }, [pathname]);

  // 渲染路由列表
  const renderRouter = (routes: any) => {
    return routes.map((item, index) => (
      <div
        className={`${styles.routeItem} ${
          routeItemInd === index && styles.routeItem_active
        }`}
        key={index}
      >
        <span
          onClick={() => goToListPage(item.path, index, null)}
          className={styles.routeItem_name}
        >
          {renderLink(item)}
        </span>
        {item.routes && item.routes[0] && (
          <div className={styles.routeItem_sub}>
            {item.routes?.map((ite, ind) => (
              <div
                key={ind}
                className={`${styles.routeItem_sub_item} ${
                  routeItemInd === index &&
                  subRouteItemInd === ind &&
                  styles.routeItem_sub_item_active
                }`}
                onClick={() => goToListPage(ite.path, index, ind)}
              >
                {renderLink(ite)}
              </div>
            ))}
          </div>
        )}
      </div>
    ));
  };

  // pc
  const pcNav = (
    <div className={styles.nav_pc}>
      <div className={styles.nav_pc_left}>
        <Link className={styles.nav_pc_name} to="/">
          <img src="/favicon.png" alt="" />
        </Link>
        <SysIcon
          className={styles.nav_pc_icon}
          type={theme ? 'icon-taiyang' : 'icon-yueliang'}
          onClick={() => {
            setTheme((v) => !v);
            props.switchTheme();
          }}
        />
      </div>
      <div className={styles.nav_pc_right}>{renderRouter(routes)}</div>
    </div>
  );

  // mobile
  const mobileNav = (
    <div className={styles.nav_mobile}>
      <div className={styles.nav_mobile_left}>
        <Link className={styles.nav_mobile_name} to="/">
          <img src="/favicon.png" alt="" />
        </Link>
        <SysIcon
          className={styles.nav_mobile_ico}
          type={theme ? 'icon-taiyang' : 'icon-yueliang'}
          onClick={() => {
            setTheme((v) => !v);
            props.switchTheme();
          }}
        />
      </div>
      <div className={styles.nav_mobile_right}>
        {pathname.split('/').length > 2 && (
          <div className={styles.go_back} onClick={() => history.go(-1)}>
            <SysIcon type="icon-a-zuojiantoufanhui" />
          </div>
        )}
        <div className={styles.nav_mobile_drawer} onClick={showDrawer}>
          <SysIcon type="icon-daohang-caidan" />
        </div>
      </div>
      <Drawer
        title="导航菜单"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={240}
        className={styles.nav_mobile_drawer}
      >
        {renderRouter(routes)}
      </Drawer>
    </div>
  );

  return (
    <div className={styles.nav} style={style} id="layout_nav">
      {classType ? mobileNav : pcNav}
    </div>
  );
};

export default Nav;
