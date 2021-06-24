import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const components = require.context('@/components', true, /\.ts$/)

let asyncRoutes = []

components.keys().forEach(key => {
  if (!key.includes('/router/index.ts')) return
  const routers = components(key).default
  asyncRoutes = asyncRoutes.concat(routers)
})

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: asyncRoutes
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
