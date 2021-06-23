import { SET_APP_INFO } from './mutation-types'
export default {
  [SET_APP_INFO](state, data) {
    return (state.AppInfo = data)
  }
}
