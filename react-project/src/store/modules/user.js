import produce from 'immer'

const initState = {
  // 每次刷新时，都从本地存储或cookie中取出token
  token: localStorage.getItem('token'),
  // 每次刷新时，我们都要想办法用token换取userinfo
  userinfo: {}
}
export default (state=initState, {type,payload}) => {
  return produce(state, newState=>{
    switch (type) {
      case 'user/login':
        newState.token = payload
        break
      default:
    }
  })
}
