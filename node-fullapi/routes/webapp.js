const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const checkToken = require('../middlewares/checkToken')

const v = '/api/v1'

const U = require('../controllers/webapp/user')
const G = require('../controllers/webapp/good')
const C = require('../controllers/webapp/cart')

// RESTful API 规范（一种需要鉴权，一种不需要鉴权）
router
.get(`${v}/good/list`, G.getGoodList)
.get(`${v}/good/cate`, G.getAllCates)
.get(`${v}/good/info`, G.getGoodInfo)
.post(`${v}/user/regist`, U.regist)
.post(`${v}/user/login`, U.login)
.post(`${v}/cart/add`, checkToken, C.addToCart)
.get(`${v}/cart/list`, checkToken, C.getCartList)
.get(`${v}/cart/del`, checkToken, C.delCartItem)
.get(`${v}/cart/upd`, checkToken, C.updCartCount)
.post(`${v}/cart/submit`, checkToken, C.submitCart)

module.exports = router
