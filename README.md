## 添加tab的时候自动会定位到视图界面
![bar.gif](..%2F..%2F..%2Fgif-licecap%2Fbar.gif)

## 使用
### 1、安装
```npm i vue3-router-tabs -D```
### 2、使用

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
