import { createApp } from 'vue'
import App from './App.vue'
import router from './lib/router'
import store from './lib/store'
import SvgIcon from './lib/svg/SvgIcon.vue'
import Api from './lib/request/request'
import tools from './lib/tools'
import constant from './lib/constant'
import './lib/style/app.less'
const app = createApp(App)
// noinspection JSUnresolvedVariable
app.config.globalProperties = {
  R: Api,
  C: constant,
  T: tools
}
// noinspection JSUnresolvedFunction
app.use(store).use(router).mount('#app')
// svg
app.component('svg-icon', SvgIcon)
import './lib/svg/index'
