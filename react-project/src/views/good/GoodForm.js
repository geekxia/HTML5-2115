import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { Form, Input, InputNumber, Button, Switch, message } from 'antd'
import GoodSelect from './components/GoodSelect'
import GoodUpload from './components/GoodUpload'
import './style.scss'

import { submitGood, getInfo } from '@/store/actions'

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 9 }
}
const validateMessages = {
  required: '${label} 是必填字段!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}

export default () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  const { done, info } = useSelector(state=>state.good)
  console.log('info', info)

  const [form] = Form.useForm()
  console.log('form api', form)

  useEffect(()=>{
    // 表示商品提交成功
    if (done===1) {
      message.success(`${id?'修改':'添加'}成功`, 1, ()=>{
        history.goBack()
      })
    }
    return ()=>{
      // 路由销毁时，清空redux中的缓存数据
      dispatch({type:'good/done',payload:0})
    }
  }, [done])

  useEffect(()=>{
    // 如果有id，说明是编辑，触发调接口获取商品详情
    // 商品详情数据，用于填充表单的
    if (id) {
      dispatch(getInfo(id))
    }
    return ()=>{
      // 通知store清除掉info数据
      // 下面这行代码，不能在更新流程中执行，只需要在组件销毁时执行
      dispatch({type:'good/reset',payload:0})
    }
  }, [])

  useEffect(()=>{
    // 使用异步数据，填充表单初始值
    if (info._id) {
      // Form.Item绑值的字段和后端返回的字段
      form.setFieldsValue(info)
    }
  }, [info])

  const onFinish = values => {
    console.log('提交', values)
    // 如果id存在，把id传给后端，就表示是编辑
    if (id) values['id'] = id
    // 提交接口
    dispatch(submitGood(values))
  }

  return (
    <div className='qf-goodform'>
      <div className='title'>{id?'商品编辑':'商品新增'}</div>
      {/* initialValues 相当表单的defaultValue */}
      {/* 不能用于给表单填充异步的默认初始值，建议form api */}
      <Form
        {...layout}
        name="good"
        onFinish={onFinish}
        validateMessages={validateMessages}
        validateTrigger='onBlur'
        initialValues={{
          name: '',
          img: ''
        }}
        form={form}
      >
        {/* 在antd中，被Form.Item所包裹的表单，可自动取值 */}
        <Form.Item
          name='name'
          label="商品名称"
          rules={[
            { required: true }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='desc'
          label="商品简介"
          rules={[
            { required: true }
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name='cate'
          label="选择品类"
          rules={[
            { required: true }
          ]}
        >
          {/* 被Form.Item包裹的组件，相当于给了value + onChange */}
          <GoodSelect />
        </Form.Item>

        <Form.Item
          name='price'
          label="商品价格"
          rules={[
            { type: 'number', min: 0, max: 999999999 },
            { required: true }
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          name='hot'
          label="是否热销"
          valuePropName='checked'
        >
          {/* checked + onChange */}
          <Switch />
        </Form.Item>

        <Form.Item
          name='img'
          label='商品图片'
          rules={[
            { required: true }
          ]}
        >
          {/* 被Form.Item包裹的组件，相当于给了value+onChange */}
          <GoodUpload />
        </Form.Item>

        <Form.Item
          wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
          <Button type="primary" htmlType="submit">
            {id?'修改':'添加'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
