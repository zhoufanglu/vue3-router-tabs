import { createRouter, createWebHashHistory } from 'vue-router'

import routes from './routes'

/**********************路由定义***********************/
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
