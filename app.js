/* =================以下是引入模块=======================*/
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const json = require('koa-json');
const onerror = require('koa-onerror');
const static = require('koa-static');
const app = new Koa();
const server = require('http').Server(app.callback());
// const io = require('socket.io')(server);
const mongoose = require('./src/config/mongoose.js')();
const config = require('./src/config');

/* 静态资源目录 */
/* app.use(static(__dirname + '/build')); */

// 错误处理
onerror(app);

// 定义本地服务端口
const host = 'http://127.0.0.1:';
const port = 3333; //设置本地服务端口

// 中间件
app.use(bodyparser());
app.use(json());

//资源加载记录log
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 监听端口启动服务
server.listen(port, () => console.log("服务已经启动，APIhost：" + host + port));

/* ================ 以下是路由模块 按类别分发=============== */
// 主路由，负责跨域和反向代理
const index = require('./src' + config.version + '/routes/index.js');
app.use(index.routes(), index.allowedMethods());

// 用户类路由，负责所有用户类api
const user = require('./src' + config.version + '/routes/user/index.js');
app.use(user.routes(), user.allowedMethods());
