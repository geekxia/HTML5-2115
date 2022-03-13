import { makeAutoObservable } from 'mobx'
import { fetchCnode } from '@/api'

export default class CnodeStore {
  constructor () {
    makeAutoObservable(this)
  }
  list = []
  getList (params) {
    // 在这里调接口，走mobx数据流程
    fetchCnode(params).then(list => {
      console.log('mobx list', list)
      this.list = list
    })
  }
}
