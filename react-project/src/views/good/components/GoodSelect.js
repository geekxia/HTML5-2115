import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Select } from 'antd'
import { getCates } from '@/store/actions'

const { Option } = Select

const data = [
  { id:1, value:'office', label: '办公用品' },
  { id:2, value:'drink', label: '酒水饮料' },
  { id:3, value:'sport', label: '运动户外' }
]

// 商品品类下拉框组件
export default props => {

  const { value, onChange, showAll } = props
  const dispatch = useDispatch()
  const { cates } = useSelector(state=>state.good)

  useEffect(()=>{
    dispatch(getCates())
  }, [])

  return (
    <Select
      allowClear
      placeholder='全部品类'
      value={value}
      onChange={onChange}
      style={{width:'100%'}}>
      {
        showAll && <Option value=''>全部</Option>
      }
      {
        cates.map(ele=>(
          <Option key={ele._id} value={ele.cate}>{ ele.cate_zh }</Option>
        ))
      }
    </Select>
  )
}
