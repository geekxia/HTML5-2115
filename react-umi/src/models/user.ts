import { fetchUser } from '@/services'

export default {
  // 指定命名空间
  namespace: 'user',
  // 子store中的状态变量（可被组件共享）
  state: {
    msg: 'Hello Dva',
    userinfo: {}
  },
  // 相当于是vuex中的mutations方法，专门用于修改state的。
  reducers: {
    save (state, {payload}) {
      // 当开启了immer后，这里可以直接修改state
      state.msg = payload
    },
    udpateUserInfo(state, {payload}) {
      console.log('----', payload)
      state.userinfo = payload
    }
  },
  // 相当于vuex中的actions方法，专门用于与后端api打交道的
  // 这背后是redux-saga在支持，不是redux-thunk。
  // redux-saga在解决异步数据流时，推荐使用generator函数语法。
  effects: {
    *getInfo ({payload}, {call, put}) {
      // call('调接口的方法', '调接口的入参')
      const userinfo = yield call(fetchUser, {...payload})
      // 拿到后端数据后，通过reducers方法，更新到state上
      // put({type:'reducer方法名', payload:'数据'}) 相当于dispatch
      yield put({type:'udpateUserInfo', payload:userinfo})
    }
  }
}
