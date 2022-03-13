import { useDispatch } from 'react-redux'
import { Form, Input, Button, Checkbox } from 'antd'
import './style.scss'
import { login } from '@/store/actions'

export default () => {

  const dispatch = useDispatch()

  const onFinish = values => {
    console.log('登录', values)
    // 表单验证，密码加密（推荐使用md5）
    // cnpm i md5 -S  // md5(password)
    // 提交登录（异步）成功，拿到token（Token是登录时由后端生成，用于记录当前用户信息）
    // 前端把token存储在localStorage、cookie、状态管理redux中。
    // 再使用token调接口，获取用户信息（用户名、role角色、其它。。）
    // 拿到用户角色role，将用户信息保存在redux状态管理中，然后跳转到系统内页Layout。
    // 进入Layout后，根据role来生成当前用户有权看到的菜单(Link)和路由(Route)。

    // 注意：实际上在这里可以直接调接口，但为了学习Redux，我们想走流程。
    // dispatch(action) / dispatch(action生成器)
    dispatch(login(values))
  }

  return (
    <div className="qf-login">
      <div className="wrap">
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入有效的用户名!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密 码"
            name="password"
            rules={[
              { required: true, message: '请输入有效的用户名!' },
              { pattern: /^[0-9]{6}$/, message: '密码有误，请输入6位数字密码' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 16 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 6, span: 16 }}
          >
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
