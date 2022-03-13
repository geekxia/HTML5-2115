// 这是一个子store
// 在mobx中，最重要的两个基本概念：observalbe变量、action行为。
// observalbe变量，就是可被组件共享的响应式变量
// action行为，用于定义修改observable变量的方法
// 注意：这里的action，不是你们vuex中的那个actions

import { observable, action, makeObservable } from 'mobx'

export default class CountStore {
  constructor () {
    makeObservable(this, {
      num: observable,
      add: action,
      sub: action
    })
  }

  num = 0
  add () {
    this.num++
  }
  sub () {
    this.num--
  }
}
