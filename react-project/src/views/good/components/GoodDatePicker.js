import { useState } from 'react'
import { DatePicker } from 'antd'
const { RangePicker } = DatePicker

// 知识：推荐使用moment.js这个库处理各种日期和时间

export default () => {
  const [range, setRange] = useState([])
  const change = (dates, str) => {
    // console.log('dates', dates)
    // console.log('str', str)
    // 在这里使用moment.js的api把日期处理，返回给父组件
    console.log(dates[0].format('YYYY-MM-DD'))
    console.log(dates[1].format('YYYY-MM-DD'))
  }
  return (
    <RangePicker
      style={{width:'250px'}}
      value={range}
      onChange={change}
    />
  )
}
