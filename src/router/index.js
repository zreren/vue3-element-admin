import { createRouter, createWebHashHistory } from 'vue-router'

import redirect from './modules/redirect'
import error from './modules/error'
import login from './modules/login'
import lock from './modules/lock'
import home from './modules/home'
import test from './modules/test'
import user from './modules/user'
import business from './modules/business'
import logs from './modules/logs'
import config from './modules/config'
import financial from './modules/financial'
import recruitment from './modules/recruitment'
import task from './modules/task'
/* 菜单栏的路由 */
// 固定菜单
export const fixedRoutes = [
  ...home,
  ...user,
  ...business,
  ...test,
  ...logs,
  ...config,
  ...financial,
  ...recruitment,
  ...task,
]
// 动态菜单
export const asyncRoutes = []

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    ...redirect, // 统一的重定向配置
    ...login,
    ...lock,
    ...fixedRoutes,
    ...error,
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { left: 0, top: 0 }
    }
  },
})

export default router
