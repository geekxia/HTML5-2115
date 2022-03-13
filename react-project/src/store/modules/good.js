
import produce from 'immer'

const initState = {
  total: 0,
  list: [],
  cates: [],
  done: 0,
  info: {}
}
export default (state=initState, {type,payload}) => {
  return produce(state, state=>{
    switch (type) {
      case 'good/list':
        state.total = payload.total
        state.list = payload.list
        break
      case 'good/cates':
        state.cates = payload
        break
      case 'good/done':
        state.done = payload
        break
      case 'good/info':
        state.info = payload
        break
      case 'good/reset':
        state.info = {}
        break
      default:
    }
  })
}
