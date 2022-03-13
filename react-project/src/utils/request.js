import axios from 'axios'

const baseURL = 'http://localhost:8000'
// const version = '/api/v1'

// 创建axios实例
const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {}
})

// 封装请求拦截器
instance.interceptors.request.use(config => {

  return config
}, error => Promise.reject(error))

// 封装响应拦截器
instance.interceptors.response.use( response => {
  // 数据过滤，目的是希望下游可以拿到想要的数据
  // 这里过滤的是Cnode接口
  if (response.status === 200) {
    if (response.data && response.data.success) {
      return response.data.data
    }
  }
  // 这里过滤我们自己的node接口
  if (response.status === 200) {
    if (response.data && response.data.err===0) {
      return response.data.data
    }
  }
  return response
}, error => Promise.reject(error))

export default instance
