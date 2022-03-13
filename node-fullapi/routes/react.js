const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const checkToken = require('../middlewares/checkToken')

const U = require('../controllers/admin/user')
const G = require('../controllers/admin/good')
const UP = require('../controllers/upload')

const v = '/apix/v1'

// RESTful API 规范（一种需要鉴权，一种不需要鉴权）
// 举例：http://localhost:9999/apix/v1/getGoodList
router
.get(`${v}/getGoodList`, G.getGoodList)
.get(`${v}/getAllCate`, G.getAllCate)
.post(`${v}/updateGood`, G.updateGood)
.post(`${v}/delGood`, G.delGood)
.post(`${v}/upload/img`, UP.uploadImg)
.get(`${v}/getGoodInfo`, G.getGoodInfo)
.post(`${v}/login`, U.login)
.get(`${v}/getUserInfo`, checkToken, U.getUserInfo)


module.exports = router
