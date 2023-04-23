import {
  reactive,
  ref,
  watch,
  onMounted,
  toRefs,
  onBeforeMount
} from 'vue'
import type { TabType } from './types'

const useRouterTabs = (tabs: TabType[], emit: any, route: any) => {
  // dom对象
  const tabsRef = ref<HTMLDivElement | null>(null) // 实际容器大小
  const tabsOutRef = ref<HTMLDivElement | null>(null) // 外侧容器对象
  let timer:ReturnType<typeof setTimeout> = setTimeout(()=>{})
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
  const handlePos = () => {
    setMove()
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
        // console.log('新增')
      }
      // 删除
      else if (newLength < oldLength) {
        // setMove()
        console.log('删除')
      } else {
      }
      variables.isCanMove = newLength >= 1
    },
    { deep: true }
  )
  // 监听路由变化
// 判断路由，控制当前导航标签
  watch(() => route.path, (newValue) => {
    setMove()
  }, {immediate: false})

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
      variables.curActive = curActive.activeMenu
      emit('handleTabClick', curActive)
    }else{
      variables.tabList.splice(index, 1)
    }
    // ?如果删光了，跳转到首页
    if (!variables.tabList.length) {
      emit('handleTabClick', {
        name: '首页',
        path: '/home',
        activeMenu: 'home'
      })
    }
  }

  const closeAllTab = (type: string) =>{
    emit('handleDeleteAllTab', type)
  }

  /**********************计算偏移距离***********************/
  const setMove = () => {
    timer = setTimeout(() => {
      if (!tabsOutRef.value) {
        return false
      }
      const outWidth = tabsOutRef.value!.offsetWidth
      // const innerWidth = tabsRef.value!.offsetWidth
      const activeTab = document.querySelector('.tab-active')
      const activePos =
        parseInt(String(activeTab?.getBoundingClientRect().x)) -
        parseInt(String(tabsOutRef.value.getBoundingClientRect().x))

      /*console.log('可视区域范围', `0~${outWidth}`)
      console.log('实际宽度', `${innerWidth}`)
      console.log(' 当前选择的Tab相对于可视区域的位置:--', activePos)
      console.log('----')*/
      // 判断当前选项在不在可视区域内， 如果不在，进行定位
      if(activePos >0 && activePos + activeTab!.clientWidth/2 < outWidth){
        // console.log('不需要移动')
        return false
      }else {
        if(activePos<0){
          // 左移
          variables.moveCount--
          // console.error('左移')
        }else if(activePos>outWidth) {
          // 右移
          variables.moveCount++
          // console.error('右移')
        }
        translateX()
        setMove()
      }
    }, 200)
  }

  onBeforeMount(() => {
    clearTimeout(timer)
  })

  return {
    setActiveClass,
    variables,
    tabsRef,
    tabsOutRef,
    prevClick,
    nextClick,
    tabItemClick,
    handleDel,
    closeAllTab,
    handlePos
  }
}
export { useRouterTabs }
