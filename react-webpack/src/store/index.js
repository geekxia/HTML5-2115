import CountStore from './modules/count'
import CnodeStore from './modules/cnode'

class Store {
  constructor () {
    // 在这里合并子Store
    this.count = new CountStore()
    this.cnode = new CnodeStore()
  }
}

// 状态管理容器的根store
const store = new Store()
export default store
