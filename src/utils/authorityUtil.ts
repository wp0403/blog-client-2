import { cloneDeep } from 'lodash';
import type { Route } from '@/models/connect';
import api from '@/api';

const { all } = api;

// 全局资源存储
let globalAuthorityModules: AuthorityModuleType[] = [];

export interface AuthorityModuleType {
  id: string;
  authName: string;
  desc: string;
}

// 设置全局权限缓存
export const setGlobalAuthorityModule = (
  AuthorityModule: AuthorityModuleType[],
) => {
  sessionStorage.setItem('AuthorityModule', JSON.stringify(AuthorityModule));
};

// 获取全局资源对象
export const getGlobalAuthorityModule = (): AuthorityModuleType[] => {
  const str = sessionStorage.getItem('AuthorityModule');
  if (str) {
    globalAuthorityModules = JSON.parse(str);
  } else {
    globalAuthorityModules = [];
  }
  return globalAuthorityModules;
};

// 初始化权限
export const initGlobalAuthority = async (userId = null) => {
  await all._getAuthority({ params: { userId } }).then((res) => {
    globalAuthorityModules = [];
    if (res.data.code === 200) {
      globalAuthorityModules = res.data?.data;
    }
    setGlobalAuthorityModule(globalAuthorityModules);
  });
};

// 权限校验
export const authCheck = (routerItem: Route) => {
  // 判断是否需要权限校验
  if (!routerItem.authority) return true;
  // 获取权限列表
  const AuthorityModule: AuthorityModuleType[] = getGlobalAuthorityModule();
  // 校验是否有该权限
  const authKey =
    AuthorityModule.some((item) => item.authName === routerItem.authority) ||
    false;
  // 返回校验结果
  return authKey;
};

/**
 * 过滤没有name的路由
 */
export const filterNoName = (routerNode: Route[] | Route) => {
  const newRoutes = cloneDeep(routerNode);

  // 判断是否是数组
  if (Array.isArray(newRoutes)) {
    return newRoutes
      .filter((item: Route) => item.name)
      .map((item: Route) => filterNoName(item));
  }
  // 判断是否包含子路由
  if (newRoutes.routes && newRoutes.routes[0]) {
    return {
      ...newRoutes,
      // 递归调用
      routes: filterNoName(newRoutes.routes),
    };
  }
  return newRoutes;
};

/**
 * 路由权限过滤
 */
export const authRouterFilter = (routerNode: Route) => {
  const newRoutes = cloneDeep(routerNode);

  // 判断是否是数组
  if (Array.isArray(newRoutes)) {
    return newRoutes
      .filter(
        (item: Route) => !item.authority || (item.authority && authCheck(item)),
      )
      .map((item: Route) => authRouterFilter(item));
  }
  // 判断是否包含子路由
  if (newRoutes.routes && newRoutes.routes[0]) {
    return {
      ...newRoutes,
      // 递归调用
      routes: authRouterFilter(newRoutes.routes),
    };
  }
  return newRoutes;
};

/**
 * 根据当前地址栏信息匹配路由对象
 */
export const matchingRoute = (pathname: string, route: Route) => {
  if (Array.isArray(route)) {
    return route
      .map((item) => matchingRoute(pathname, item))
      .find((item) => item);
  }
  if (route.path === pathname) {
    return authCheck(route) ? pathname : '403';
  }
  if (route.routes && route.routes[0]) {
    return route.routes
      .map((item) => matchingRoute(pathname, item))
      .find((item) => item);
  }
};
