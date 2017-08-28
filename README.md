# mongo-server
使用koa2和mongodb构建的API服务。

只有server部分，API原型模仿淘宝，特性在本页底部。

可以mock数据，反向代理，支持http和tcp。

就这样，想到再写吧。

#### 技术栈：
- nodejs
- koa2
- es6/7
- mockjs
- koa2-pixie-proxy
- RESTful API
- mongoDB
- mongoose
- socket.io

## 使用方法

`git clone https://github.com/shifeng1993/mongo-server.git apiServer`

`cd apiServer`

`npm install`

启动mongodb
`mongod`

二选一
`supervisor app` / `node app`

## 版本特性
#### 1.0.0
- 用户模块，包含用户注册，，用户登录。。以及用户详情页

- 商品列表模块，包含商品展示，

- 商品详情页面，商品具体详细信息。以及商品属性选择

- 用户购物车模块，可以添加喜欢商品以及商品属性。

- 订单页面，购买后产生的订单详情，包含商品属性

- 供应商模块，对商品进行补充，更改，删除等操作。

## 待添加特性
- 模糊搜索模块，搜索结果呈现在商品列表中，


