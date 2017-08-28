const koaRouter = require('koa-router');

// 统一增加版本前缀
const router = koaRouter({
    prefix: '/api'
});

/* 反向代理配置 */
// const pixie = require('koa2-pixie-proxy');

/* 反向代理配置host */
// const proxy = pixie({host: 'http://localhost:9999'});

/* 跨域配置 */
router.all('*', async(ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHead' +
            'erFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
    ctx.set('Content-Type', 'application/json;charset=utf-8');
    if (ctx.method == 'OPTIONS') {
        ctx.status = 200;
    } else {
        await next();
    }
});

/* 代理转发示例 */
//router.get('/api/goods',proxy('/api/goods'))

// 以下是api模块
const controllers = require('../controllers');

/* *************************以下是api模块 ***************************/

// test
router.get('/test', controllers.mock.goods)

/* ***用户类****/
// 用户登录
router.post('/user/signIn', controllers.user.signIn)
// 用户注册
router.post('/user/signUp', controllers.user.signUp)
// 查看用户资料
router.get('/user/getUserInfo/:useruuid', controllers.user.getUserInfo)
// 编辑用户资料
router.post('/user/setUserInfo', controllers.user.setUserInfo)

/* ***订单类****/
// 查看订单 ,没有订单id则为查看列表
router.get('/order/getOrder/:useruuid', controllers.order.getOrder) 
router.get('/order/getOrder/:useruuid/:orderuuid', controllers.order.getOrder) 
// 新增订单交给后台计算
router.post('/order/addOrder', controllers.order.addOrder)
// 提交订单
router.post('/order/saveOrder', controllers.order.saveOrder)
// 删除订单
router.get('/order/removeOrder/:useruuid/:orderuuid', controllers.order.removeOrder)  

/* ***购物车类****/
// 查看购物车
router.get('/shoppingCart/getGoods/:useruuid', controllers.shoppingCart.getGoods)
// 加入购物车
router.post('/shoppingCart/addGoods', controllers.shoppingCart.addGoods)
// 修改：在购物车内修改已选属性，包括数量, 支持批量
router.post('/shoppingCart/editGoods', controllers.shoppingCart.editGoods)
// 删除：删除购物车内商品，支持批量
router.post('/shoppingCart/removeGoods', controllers.shoppingCart.removeGoods)

/* ***商品类****/
// 查询售卖商品
router.get('/goods/getGoodsList', controllers.goods.getGoodsList)
// 查询售卖商品单个信息
router.get('/goods/getGoods/:goodsuuid', controllers.goods.getGoods)
// 添加售卖商品
router.post('/goods/addGoods', controllers.goods.addGoods)
// 修改售卖商品
router.post('/goods/editGoods', controllers.goods.editGoods)
// 删除售卖商品, 支持批量
router.post('/goods/removeGoods', controllers.goods.removeGoods)



module.exports = router;
