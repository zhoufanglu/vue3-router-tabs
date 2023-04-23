import type { RouteRecordRaw } from 'vue-router'

import App from '../App.vue'
/**
 * 基础路由
 */
const basePage: RouteRecordRaw[] = [
  {
    path: '/',
    //redirect: '/home',
    component: App,
  }
]

const routes = [...basePage]

export default routes
