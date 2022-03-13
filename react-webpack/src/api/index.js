import instance from '@/utils/request'

function fetchCnode(params) {
  return instance({url:'/topics',method:'GET',params})
}

export {
  fetchCnode
}
