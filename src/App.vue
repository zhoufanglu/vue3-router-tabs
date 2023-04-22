<template>
  <div>
    <RouterTabs
        v-model:tabs="tabs"
        @handleTabClick="handleTabClick"
    ></RouterTabs>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import type {TabType} from './components/router-tabs/types'
import { useRoute, useRouter } from 'vue-router'

// 导入路由
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
}
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
