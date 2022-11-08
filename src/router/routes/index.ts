import type { RouteRecordRaw } from 'vue-router';
import { PageEnum } from '../../enums/pageEnum';

const modules = import.meta.glob('./modules/**/*.ts', { eager: true });
const routeModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = (modules[key] as any).default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

// Page Root
export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_LOGIN, // 重定向到登录页
  meta: {
    title: 'Home Page',
  },
};

// Page Login
export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login.vue'),
  meta: {
    title: 'Login Page',
  },
};

// 404 Page Not Found
export const PageNotFoundRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'PageNotFound',
  component: () => import('/@/views/sys/exception.vue'),
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true,
  },
};

// Basic routing without permission
export const basicRoutes = [LoginRoute, RootRoute, ...routeModuleList, PageNotFoundRoute];
