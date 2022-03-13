import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Input } from 'antd'
import './style.scss'

import GoodSelect from './components/GoodSelect'
import GoodDatePicker from './components/GoodDatePicker'
import GoodTable from './components/GoodTable'


const labelStyle = {textAlign:'right',paddingRight:'3px'}

export default props => {
  // console.log('good list ---props', props)

  const [params, setParams] = useState({name:'',cate:''})

  return (
    <div className='qf-goodlist'>
      <div className='filter'>
        <Row align='middle'>
          <Col span={3} style={labelStyle}>商品名称：</Col>
          <Col span={4}>
            <Input
              placeholder='搜索'
              allowClear
              value={params.name}
              onChange={ev=>setParams({...params, name:ev.target.value})}
            />
          </Col>
          <Col span={2} style={labelStyle}>
            品类：
          </Col>
          <Col span={4}>
            <GoodSelect
              showAll
              value={params.cate}
              onChange={cate=>setParams({...params,cate})}
            />
          </Col>
          <Col span={3} style={labelStyle}>日期选择：</Col>
          <Col span={6}>
            <GoodDatePicker />
          </Col>
        </Row>
      </div>

      <GoodTable params={params} />
    </div>
  )
}
