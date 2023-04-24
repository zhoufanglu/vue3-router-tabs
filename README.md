## 添加tab的时候自动会定位到视图界面
![bar.gif](..%2F..%2F..%2Fgif-licecap%2Fbar.gif)
##
[demo](https://zhoufanglu.github.io/vue3-router-tabs-gitpage/#/home)
## 使用
### 1、安装
```npm i vue3-router-tabs -D```
### 2、使用
```vue
<template>
  <RouterTabs 
      :tabs="tabs"
      :route="route"
      @handleTabClick="handleTabClick"
      @handleDeleteAllTab="handleDeleteAllTab"
  ></RouterTabs>
</template>
<script setup lang="ts">
import 'vue3-router-tabs/lib/style.css' // 引入样式
import { RouterTabs } from 'vue3-router-tabs' // 引入组件
import type { TabType } from 'vue3-router-tabs/lib/components/router-tabs/types' // 引入类型 js可以不引入

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const tabs = ref<TabType[]>([
  { name: '表格', path: '/table', activeMenu: 'table' },
  { name: '标题', path: '/title', activeMenu: 'title' },
  { name: '卡片', path: '/card', activeMenu: 'card' }
])

// 点击tab事件，一般直接跳转路由
const handleTabClick = (tab: TabType) => {
  console.log(20, tab)
  router.push(tab.path)
}
// 右侧关闭事件
const handleDeleteAllTab = (type: 'all' | 'other') => {
  if (type === 'all') {
    tabs.value = []
  } else if (type === 'other') {
    const curPageTab = tabs.value.find((tab: TabType) => tab.path === route.path)
    tabs.value = curPageTab ? [curPageTab] : []
  }
}
</script>

```

## 属性 & 事件
| 属性                 | 说明                                               | 类型                     | 是否必填 |
|--------------------|--------------------------------------------------|------------------------|------|
| tabs               | 支持双向绑定v-model                                    | TabType[]              | 是    |
| route              | 路由对象, 用来绑定选中和跳转                                  | Route                  | 否    |
| handleTabClick     | tab点击的回调                                         | function(tab: TabType) | 否    |
| handleDeleteAllTab | 关闭所有页面的回调  <br/> `type`的值为：`all`(关闭所有)， `other`(关闭其它) | function(type:string)  | 否    |


## TabType类型
```ts
interface TabType {
  name: string // 菜单名称
  activeMenu?: string // 菜单选中绑定的值
  path: string //路由跳转的地址
  meta?: any // 自定义参数。。类似router的meta
}
```

## 注意点
::: warning
1、绑定的时候最好传入`route`对象, 因为选中是根据`route`对象的`path`来判断的,
或者根据`route`的meta内的`activeMenu`来判断选中的。  
2、默认返回首页的`path`为`/`
:::
