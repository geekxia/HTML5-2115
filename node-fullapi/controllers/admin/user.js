const userModel = require('../../models/user')
const { creataToken } = require('../../utils/jwt')

class UserController {
  // 登录接口
  static async login(ctx) {
    let { username, password } = ctx.request.body
    const user = await userModel.findOne({username, password})
    if(user) {
      // 生成token
      const token = creataToken(user)
      ctx.body = { err: 0, msg: '登录成功', data: { token }}
    }else{
      ctx.body = { err: 1, msg: '用户名和密码不匹配', data: {}}
    }
  }

  // 用户信息
  static async getUserInfo(ctx) {
    const u = ctx.user
    console.log('u', u)
    const info = await userModel.findOne({username: u.username})
    console.log('user info', info)
    const roles = info.role.split(';').filter(e=>e)
    ctx.body = {
      err: 0,
      msg: 'success',
      data: {
        name: info.username,
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        introduction: '高薪就业我能行',
        roles
      }
    }
  }
}

module.exports = UserController
