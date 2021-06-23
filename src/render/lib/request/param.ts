interface header {
  /**
   * 内容类型
   */
  'Content-Type': string
}
interface option {
  /**
   * 请求地址
   */
  url: string
  /**
   * 请求类型
   */
  method: any
  /**
   * header
   */
  headers: header
  /**
   * 响应类型
   */
  responseType: any
  /**
   * 请求参数
   */
  params: any
  /**
   * 请求参数
   */
  data: any
}
export { header, option }
