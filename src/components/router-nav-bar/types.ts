interface TabType {
  name: string // 菜单名称
  activeMenu?: string // 菜单选中绑定的值
  path: string //路由跳转的地址
  meta?: any // 自定义参数。。类似router的meta
}
export type { TabType }
