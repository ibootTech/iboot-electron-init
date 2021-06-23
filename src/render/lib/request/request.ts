import { header, option } from './param'
import { Result, DefaultResponse } from './result'
import defaultAxios from './defaultAxios'
const Api = {
  get: (url: string, headers?: header): Promise<DefaultResponse> => {
    const option: any = {}
    option.url = url
    option.method = 'GET'
    if (headers) {
      option.headers = headers
    }
    return defaultRequest(option, null)
  }
}
/**
 * 请求方法
 * @param option 配置
 * @param params 参数
 */
const defaultRequest = (option: option, params: any): Promise<DefaultResponse> => {
  option.headers = setDefaultHeader(option.headers)
  option.method.toUpperCase() === 'GET' ? (option.params = params) : (option.data = params)
  return new Promise((resolve, reject) => {
    return defaultAxios
      .request(option)
      .then(async response => {
        resolve(Result.successResult(response))
      })
      .catch(() => {
        reject(Result.failResult())
      })
  })
}

/**
 * 设置默认请求头
 * @param headers
 */
function setDefaultHeader(headers: any): header {
  if (!headers) {
    headers = {}
    headers['content-type'] = 'application/json'
  } else if (!headers['content-type']) {
    headers['content-type'] = 'application/json'
  }
  return headers
}
export default Api
