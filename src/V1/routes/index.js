const koaRouter = require('koa-router');

// 版本和前缀控制
const config = require('../../config');

// 统一增加版本前缀
const router = koaRouter({
    prefix: '/api' + config.version
});

/* 反向代理配置 */
// const pixie = require('koa2-pixie-proxy');

/* 反向代理配置host */
// const proxy = pixie({host: 'http://localhost:9999'});

/* 跨域配置 */
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

/* 代理转发示例 */
//router.get('/api/goods',proxy('/api/goods'))

module.exports = router;
