import { createStore } from 'vuex'
const modules = {}
const storeFiles = require.context('@/components', true, /\.ts$/)
storeFiles.keys().forEach(key => {
  if (!key.includes('/store/index.ts')) return
  const stores = storeFiles(key).default
  for (const key in stores) {
    modules[key] = stores[key]
  }
})
const store = createStore({
  modules: modules
})
export default store
