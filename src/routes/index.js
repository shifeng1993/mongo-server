const router = require('koa-router')();
// 代理转发模块
// const pixie = require('koa2-pixie-proxy');

// 设置后端服务器url
// const proxy = pixie({host: 'http://localhost:9999'}); // node作为中间层做代理转发

// 引入controller
const controllers = require('../controllers');

// 跨域模块
router.all('/api/*', async(ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHead' +
            'erFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
    if (ctx.method == 'OPTIONS') {
        ctx.status = 200;
    } else {
        await next();
    }
});

/* ================以下是api模块=============== */
// test
router.get('/api/test', controllers.mock.goods)
router.get('/api/create', controllers.user.create)

// 代理转发示例 

//router.get('/api/goods',proxy('/api/goods'))

module.exports = router;
