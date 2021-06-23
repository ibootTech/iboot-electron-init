import types from './mutation-types'
export default {
  [types.SET_APP_INFO]({ commit }, data) {
    commit(types.SET_APP_INFO, data)
  }
}
