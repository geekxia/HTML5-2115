import axios from 'axios'

const baseURL = 'http://localhost:8080'
const version = '/api/v1'

// 创建axios实例
const instance = axios.create({
  baseURL: baseURL + version,
  timeout: 5000,
  headers: {}
})

// 封装请求拦截器
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  return Promise.reject(error)
})

// 封装响应拦截器
instance.interceptors.response.use(function (response) {
  // 数据过滤，目的是希望下游可以拿到想要的数据
  if (response.status === 200) {
    if (response.data && response.data.success) {
      return response.data.data
    }
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

export default instance
