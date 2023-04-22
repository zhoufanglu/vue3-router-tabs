import RouterTabs from './router-tabs/index.vue'
// 按需引入导出
export {RouterTabs}
// 全局导出
const Vue3RouterTabs = {
  install(app: any) {
    app.component('RouterTabs', RouterTabs)
  },
}

export default Vue3RouterTabs
