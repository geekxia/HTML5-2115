import { useHistory } from 'react-router-dom'

import { Row, Col, Button } from 'antd'
import {
  RedoOutlined,
  SettingOutlined,
  ColumnHeightOutlined
} from '@ant-design/icons'

export default () => {

  const history = useHistory()

  const skip = () => {
    history.push('/good/add')
  }

  return (
    <div className='table-header'>
      <Row>
        <Col span={4}>查询表格</Col>
        <Col offset={12} span={8} style={{textAlign:'right'}}>
          <Button size='small' type='primary' onClick={skip}>新增</Button>
          <RedoOutlined />
          <SettingOutlined />
          <ColumnHeightOutlined />
        </Col>
      </Row>
    </div>
  )
}
