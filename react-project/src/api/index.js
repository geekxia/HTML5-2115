import request from '@/utils/request'

// Cnode接口
export function fetchCnode(params) {
  return request({url:'/api/v1/topics',method:'GET',params})
}

// 我们自己的node接口
export function fetchLogin(data) {
  return request({url:'/apix/v1/login',method:'POST',data})
}

export function fetchGoodList(params) {
  return request({url:'/apix/v1/getGoodList',method:'GET',params})
}

export function fetchCates(params) {
  return request({url:'/apix/v1/getAllCate',method:"GET",params})
}

export function fetchGood(data) {
  return request({url:'/apix/v1/updateGood',method:'POST',data})
}

export function fetchInfo(params) {
  return request({url:'/apix/v1/getGoodInfo',method:'GET',params})
}

export function fetchDel(data) {
  return request({url:'/apix/v1/delGood', method:'POST', data})
}
