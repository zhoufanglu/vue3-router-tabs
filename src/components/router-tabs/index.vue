<template>
<!--  <button @click="handlePos">定位{{variables.moveCount}}</button>-->
  <div class="rs-tabs">
    <!--home icon-->
    <div style="width: 50px; height: 50px">
      <svg
          class="home-svg"
          width="46px"
          height="46px"
          viewBox="0 0 46 46"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          @click="tabItemClick({ name: 'home', path: '/', activeMenu: 'home' })"
      >
        <!-- Generator: Sketch 60 (88103) - https://sketch.com -->
        <title>首页</title>
        <desc>Created with Sketch.</desc>
        <g
            id="页面-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
        >
          <g id="iPhone-8-Plus" transform="translate(-37.000000, -54.000000)">
            <g id="首页" transform="translate(31.000000, 48.000000)">
              <ellipse
                  id="椭圆形"
                  fill="#53BDEF"
                  cx="29.5"
                  cy="33"
                  rx="12.5"
                  ry="8"
              ></ellipse>
              <image
                  x="0"
                  y="0"
                  width="58"
                  height="58"
                  xlink:href="data:image/png;base64,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"
              ></image>
            </g>
          </g>
        </g>
      </svg>
    </div>

    <!--prev-icon-->
    <i v-show="isCanMove" class="iconfont prev-icon" @click="prevClick"
    >&#xe691;</i>
    <!--tab-->
    <!--?可视区域-->
    <div ref="tabsOutRef" class="tab-box">
      <!--?内容模块-->
      <div ref="tabsRef" class="tab-panel">
        <div
            v-for="(tab, index) in tabs"
            :key="tab.name"
            class="tab-item"
            :class="setActiveClass(tab, route)"
            @click="tabItemClick(tab)"
        >
          <span class="item-dot"></span>
          <span class="name"> {{ tab.name }} </span>
          <i
              class="iconfont icon-close"
              @click.stop="handleDel(tab, index, route)"
          >&#xe689;</i
          >
        </div>
      </div>
    </div>
    <!--next-icon-->
    <i v-show="isCanMove" class="iconfont next-icon" @click="nextClick"
    >&#xe68b;</i
    >
    <!--?关闭按钮-->
    <el-dropdown v-show="tabs.length !== 0">
      <span class="el-dropdown-link" style="margin-left: 10px">
        <i class="iconfont">&#xe690;</i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="closeAllTab('all')"
          >关闭所有</el-dropdown-item
          >
          <el-dropdown-item @click="closeAllTab('other')"
          >关闭其它</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
export default {
  name: 'RouterTabs'
}
</script>
<script setup lang="ts">
import {ElDropdownMenu, ElDropdownItem, ElDropdown}  from 'element-plus'
import 'element-plus/es/components/dropdown/style/css'
import 'element-plus/es/components/dropdown-menu/style/css'
import 'element-plus/es/components/dropdown-item/style/css'
import { useRouterTabs } from './useRouterTabs'
import { toRefs, PropType } from 'vue'
import type { TabType } from './types'
//? 获取tabs实例
const props = defineProps({
  tabs: {
    type: Array as PropType<Array<TabType>>,
    default: () => [],
    required: true
  },
  route: {
    type: Object as PropType<any>,
    default: () => {}
  }
})
const emit = defineEmits([
  'update:tabs',
  'update:activeTab',
  'handleTabClick',
  'handleDeleteAllTab'
])
//? useCacheBar
const {
  prevClick,
  nextClick,
  tabItemClick,
  variables,
  tabsRef,
  tabsOutRef,
  handleDel,
  setActiveClass,
  closeAllTab,
} = useRouterTabs(props.tabs, emit, props.route)
const { isCanMove } = toRefs(variables)
</script>

<style scoped lang="scss">
/* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: 'iconfont';  /* Project id 4033269 */
  src: url('//at.alicdn.com/t/c/font_4033269_utndzardmhg.woff2?t=1682236727187') format('woff2'),
  url('//at.alicdn.com/t/c/font_4033269_utndzardmhg.woff?t=1682236727187') format('woff'),
  url('//at.alicdn.com/t/c/font_4033269_utndzardmhg.ttf?t=1682236727187') format('truetype');
}

.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.rs-tabs {
  // border: solid 1px red;
  $theme: #5385ed;
  flex-shrink: 0;
  height: 46px !important;
  line-height: 46px;
  box-sizing: border-box;
  border-bottom: solid 1px $theme;
  background-color: white;
  color: #515a6e;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .prev-icon,
  .next-icon {
    cursor: pointer;
    -webkit-user-select: none;
  }
  .home-svg {
    cursor: pointer;
    transform: scale(0.5);
  }
  .tab-active {
    .item-dot {
      background-color: $theme !important;
    }
    .name {
      color: $theme !important;
    }
  }
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .prev-icon {
    cursor: pointer;
    margin: 0 6px;
    &:hover {
      color: $theme;
    }
  }
  .next-icon {
    @extend .prev-icon;
  }
  .tab-box {
    // border: solid 1px red;
    width: calc(100% - 50px - 64px);
    display: flex;
    align-items: center;
    height: 32px;
    overflow: hidden;
    padding: 0 16px;
    .tab-panel {
      // background-color: #eeeeee!important;
      box-sizing: border-box;
      height: 32px;
      display: flex;
      align-items: center;
      transition: transform 0.5s;
      .tab-item {
        flex-shrink: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #515a6e;
        border: 1px solid #e8eaec !important;
        border-radius: 2px;
        box-sizing: border-box;
        height: 100%;
        margin-right: 4px;
        padding: 0 12px;
        .icon-close {
          font-size: 12px;
          transform: scale(0.8);
          color: #b5b5b5;
        }
        &:hover {
          .iconfont {
            cursor: pointer;
            color: $theme;
          }
        }
        .item-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #e8eaec;
        }
        .name {
          display: inline-block;
          margin: 0 12px;
          font-size: 12px;
        }
        .iconfont {
          font-size: 12px;
        }
      }
    }
  }
  .tab-close {
    box-sizing: border-box;
    font-size: 16px;
    color: #515a6e;
  }
}
</style>
