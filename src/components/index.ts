import RouterNavBar from './router-nav-bar/index.vue'

export {RouterNavBar}
const component = [RouterNavBar]
const Vue3RouterNavBar = {
  install(App: any) {
    component.forEach((item) => {
      App.component(item.name, RouterNavBar)
    });
  },
}

export default Vue3RouterNavBar
