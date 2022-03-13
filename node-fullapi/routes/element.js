const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const checkToken = require('../middlewares/checkToken')

const U = require('../controllers/admin/user')
const G = require('../controllers/admin/good')

const v = '/api/v1/element'

router
.post(`${v}/login`, U.login)
.get(`${v}/userinfo`, checkToken, U.getUserInfo)
.get(`${v}/good/list`, checkToken, G.getGoodList)
.get(`${v}/cates`, checkToken, G.getAllCate)
.post(`${v}/good/update`, checkToken, G.updateGood)
.post(`${v}/upload/img`, checkToken, G.uploadImg)
.get(`${v}/good/info`, checkToken, G.getGoodInfo)
.post(`${v}/good/del`, checkToken, G.delGood)

module.exports = router
