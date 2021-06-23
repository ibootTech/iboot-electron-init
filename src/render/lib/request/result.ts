class DefaultResponse {
  /**
   * 状态
   */
  status: boolean
  /**
   * 数据
   */
  data: any
  /**
   * 消息
   */
  msg: string
  constructor(status, data, msg) {
    this.status = status
    this.data = data
    this.msg = msg
  }
}
const _successResult = (data?: any, msg?: string): DefaultResponse => {
  return new DefaultResponse(true, data ? data : '', msg ? msg : 'success')
}
const _failResult = (data?: any, msg?: string): DefaultResponse => {
  return new DefaultResponse(false, data ? data : '', msg ? msg : 'fail')
}
const Result = {
  successResult: _successResult,
  failResult: _failResult
}
export { Result, DefaultResponse }
