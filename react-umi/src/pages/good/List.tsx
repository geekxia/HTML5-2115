import { useEffect } from 'react'
import { useDispatch, useSelector } from 'umi'
import { Button } from 'antd'

export default () => {

  const dispatch = useDispatch()
  const { userinfo } = useSelector(state=>state.user)

  useEffect(()=>{
    console.log('---mounted')
  }, [])

  const login = () => {
    // 触发user这个子store中的getInfo这个effect。
    dispatch({type:'user/getInfo', payload:{username:'王五'}})
  }

  return (
    <>
      <h1>商品列表</h1>
      <Button type='primary' onClick={login}>获取用户信息</Button>
      <hr/>
      <h2>{userinfo.username} - {userinfo.role}</h2>
    </>
  )
}
