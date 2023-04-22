import {
  reactive,
  ref,
  watch,
  onMounted,
  computed,
  toRefs,
  nextTick
} from 'vue'
import type { TabType } from './types'

const useRouterTabs = (tabs: TabType[], emit: any) => {
  // dom对象
  const tabsRef = ref<HTMLDivElement | null>(null) // 实际容器大小
  const tabsOutRef = ref<HTMLDivElement | null>(null) // 外侧容器对象
  // bind value
  const variables = reactive({
    isCanMove: true,
    moveCount: 0, // 移动计数
    moveWidth: 140, // 每次移动距离, 最后计算为容器的30%
    tabList: tabs,
    testRef: ref<HTMLDivElement | null>(null),
    curActive: <string | undefined>undefined
  })
  onMounted(() => {
    if (variables.tabList.length) {
      variables.curActive = variables.tabList[0].activeMenu
    }
  })
  //? 一些响应事件
  const prevClick = () => {
    variables.moveCount--
    translateX()
  }
  const nextClick = () => {
    variables.moveCount++
    translateX()
  }

  const tabItemClick = (tab: TabType) => {
    variables.curActive = tab.activeMenu!
    emit('handleTabClick', tab)
  }
  const translateX = () => {
    variables.moveCount = variables.moveCount < 0 ? 0 : variables.moveCount
    tabsRef!.value!.style.transform = `translateX(-${
      variables.moveWidth * variables.moveCount
    }px)`
  }
  // 设置当前选中的tab class
  const setActiveClass = (tab: TabType, route: any) => {
    let className: string | null = null
    if (route) {
      className =
        tab.path === route?.path || tab.activeMenu === route?.meta?.activeMenu
          ? 'tab-active'
          : null
    } else {
      className = tab.activeMenu === variables.curActive ? 'tab-active' : null
    }
    return className
  }
  /**********************监听绑定tab,做一系列操作***********************/
  //JSON.parse(JSON.stringify(variables.tabList))
  watch(
    () => variables.tabList,
    (newVal, oldValue) => {
      // 更新绑定的tabs
      emit('update:tabs', newVal)
      variables.isCanMove = newVal.length >= 1
    },
    { deep: true }
  )
  watch(
    () => JSON.parse(JSON.stringify(tabs)),
    (newVal, oldValue) => {
      const [newLength, oldLength] = [newVal.length, oldValue.length]
      // 新增
      if (newLength > oldLength) {
        setMove()
        console.log('新增')
      }
      // 删除
      else if (newLength < oldLength) {
        setMove()
        console.log('删除')
      } else {
      }
      variables.isCanMove = newLength >= 1
    },
    { deep: true }
  )
  /**********************删除逻辑***********************/
  const handleDel = (tab: TabType, index: number, route: any) => {
    const { tabList } = toRefs(variables)
    // ?如果删除的是当前选中的项，跳转到前一个， 若前一个没有 跳转到后一个
    if (setActiveClass(tab, route) === 'tab-active') {
      // 记录地址
      const [prevIndex, nextIndex] = [index - 1, index + 1]
      let curActive: TabType = tabList.value[0]
      // 如果前面有，跳转到前一个
      if (prevIndex !== -1) {
        curActive = tabList.value[prevIndex]
      }
      // 如果前面没有 并且后面有
      else if (
        prevIndex === -1 &&
        nextIndex <= tabList.value.length &&
        tabList.value.length !== 1
      ) {
        curActive = tabList.value[nextIndex]
      }
      tabList.value.splice(index, 1)
      emit('handleTabClick', curActive)
    }
    variables.tabList.splice(index, 1)
    // ?如果删光了，跳转到首页
    if (!variables.tabList.length) {
      emit('handleTabClick', {
        name: '首页',
        path: '/home',
        activeMenu: 'home'
      })
    }
  }

  const closeAllTab = (type: string) => {
    emit('handleDeleteAllTab', type)
  }

  /**********************计算偏移距离***********************/
  const setMove = () => {
    setTimeout(() => {
      if (!tabsOutRef.value) {
        return false
      }
      const outWidth = tabsOutRef.value!.offsetWidth
      const innerWidth = tabsRef.value!.offsetWidth
      const activeTab = document.querySelector('.tab-active')
      const activePos = parseInt(String(activeTab?.getBoundingClientRect().x))

      console.log('容器宽度', outWidth)
      console.log('实际宽度', innerWidth)
      console.log(' 当前选择的Tab位置:--', activePos)
      console.log('----')
      // 找出容器的范围
      const boxRect = tabsOutRef.value!.getBoundingClientRect()
      const boxStart = parseInt(String(boxRect.x - 10))
      const boxEnd = parseInt(String(boxStart + boxRect.width - 10))
      console.log('容器box范围:--', boxStart + '-' + boxEnd)
      console.log('---------------')
      let count = -1
      // 判断是否需要移动，怎样移动
      if (activePos < boxStart) {
        console.log('左移')
        count = checkMoveCount('left', Math.abs(activePos - boxStart))
        variables.moveCount = variables.moveCount - count
      } else if (activePos > boxEnd) {
        console.log('右移')
        count = checkMoveCount('right', Math.abs(activePos - boxEnd))
        variables.moveCount = variables.moveCount + count
      } else {
        count = -1
        console.log('不进行移动')
      }
      if (count !== -1) {
        translateX()
      }
    })
  }

  const checkMoveCount = (type: string, offset: number) => {
    console.log('每隔移动的距离', variables.moveWidth)
    console.log(162, type, offset)
    // 计算移动的步数
    const count = parseInt(String(offset / variables.moveWidth)) + 1
    console.log('移动的步数', count)
    return count
  }

  return {
    setActiveClass,
    variables,
    tabsRef,
    tabsOutRef,
    prevClick,
    nextClick,
    tabItemClick,
    handleDel,
    closeAllTab
  }
}
export { useRouterTabs }
