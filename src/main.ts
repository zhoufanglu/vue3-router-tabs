import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
const app = createApp(App)
// 引入开发环境
import Vue3RouterTabs from './components/index'
// 引入打包
// @ts-ignore
//vite不支持导入umd.js文件类型 所以要另外打包成mjs
// import Vue3RouterTabs from '../lib/vue3-router-tabs.js'
// import Vue3RouterNavBar from '../lib/vue3-router-tabs.js'
// @ts-ignore
app.use(Vue3RouterTabs).use(router)

app.mount('#app')
