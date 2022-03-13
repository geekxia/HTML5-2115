// 你看到的下面的这些方法，经常被称之为“action生成器函数”。
// 怎么理解这些action生成器函数呢？在业务中，一个action生成器函数，就是一个可以被复用的功能。

import { fetchCnode, fetchLogin, fetchGoodList, fetchCates, fetchGood, fetchInfo, fetchDel } from '@/api'

export function getList(params) {
  // 这个被return的函数哪来的dispatch？
  // 这个redux-thunk中间件给的
  return function (dispatch) {
    fetchCnode(params).then(list=>{
      dispatch({type:'study/list',payload:list})
    })
  }
}

export function addCount(payload) {
  return { type:'study/add', payload }
}

export function subCount(payload) {
  return { type:'study/sub', payload }
}

// 项目实践接口功能
export function login(data) {
  return function(dispatch) {
    fetchLogin(data).then(res=>{
      console.log('登录成功', res)
      if (res.token) {
        localStorage.setItem('token', res.token)
        dispatch({type:'user/login',payload:res.token})
        // 暂不考虑权限设计问题，直接进入系统内部Layout
      }
    })
  }
}

export function goodList(params) {
  return dispatch => {
    fetchGoodList(params).then(res=>{
      // console.log('商品数据', res)
      dispatch({type:'good/list', payload: res})
    })
  }
}

export function getCates() {
  return dispatch => {
    fetchCates({}).then(res=>{
      console.log('所有品类', res)
      dispatch({type:'good/cates',payload:res.list})
    })
  }
}

export function submitGood(data) {
  return dispatch => {
    fetchGood(data).then(res=>{
      console.log('商品提交成功', res)
      if (res.info) dispatch({type:'good/done',payload:1})
    })
  }
}

export function getInfo(id) {
  return dispatch => {
    fetchInfo({id}).then(res=>{
      console.log('商品详情', res)
      if (res.info) {
        dispatch({type:'good/info',payload:res.info})
      }
    })
  }
}

export function delGood(ids) {
  return dispatch => {
    fetchDel({ids}).then(res=>{
      console.log('删除成功', res)
      dispatch({type:'good/done',payload:1})
    })
  }
}
