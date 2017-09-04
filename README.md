# mongo-server
使用koa2和mongodb构建的API服务。

只有server部分，API原型模仿手机淘宝，特性在本页底部。

可以mock数据，反向代理，支持http和tcp。

后面会再更新一个rn客户端部分，和一个B端的管理后台。

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


# 路由设计以及传参设计
 - 一级路由为对象，二级路由为对这些对象的操作方法
 - 合并一些路由，从传参判断
 - 以下接口默认标注为axios的默认标准

## 枚举：

- 用户类型
userTypes: ['系统管理员', '用户', '商户'],

- 订单状态
orderStates: ['待付款', '已付款', '待发货', '已发货', '待收货', '已收货']


## 用户类
- 用户登录
  - url: /user/signIn
  - Type: POST
  - request:
  ```javascript
    {
      username: "user1",
      password: "123"
    }
  ```

- 用户注册
  - url: /user/signUp
  - Type: POST
  - request:
  ```javascript
    {
      username: 'user1',
      userphone: '123',
      password: '123',
      nickname: '321',
      userType: '用户'
    }
  ```

- 查看用户资料
  - url: /user/getUserInfo/:useruuid
  - Type: GET

- 编辑用户资料
  - url: /user/setUserInfo
  - Type: POST
  ```javascript
    {
      useruuid: '599f99f2f7ca72710fbc9b67_2',
      username: '',
      userphone: '你特么到底想要几个大傻逼',
      password: '',
      nickname: '第二个大傻逼',
      summary: '握草，干他',
      userImg: ''
    }
  ```

## 购物车类
- 查看购物车
  - url: /shoppingCart/getGoods/:useruuid,
  - Type: GET

- 加入购物车
  - url: /shoppingCart/addGoods,
  - Type: POST
  - request:
  ```javascript
    {
      goods: {
        goodsCode: '599fc0ef7975f910877e6e36',
        goodsName: '矿泉水', //商品名称
        goodsSummary: '一瓶矿泉水', // 商品简介
        goodsImg: '目前没有', //商品图片
        goodsPrice: 300, // 商品标价
        goodsType: 2, // 商品分类
        goodsNumber: 2, // 商品数量
        goodsAttrs: ['300ML'], // 商品属性
        supplierUsername: 'admin', //供货商名称
        supplierNickname: '第二个大傻逼', //供货商名称
      },
      useruuid: useruuid
    }
  ```

- 修改：在购物车内修改已选属性，包括数量, 支持批量
  - url: /shoppingCart/editGoods,
  - Type: POST
  - request:
  ```javascript
    {
      goods: [{
        "shoppingCartId": "59a39ced278ddd1f9dd7edda",
        "goodsCode": "599fc0ef7975f910877e6e36",
        "goodsName": "这瓶矿泉水真的难喝"
      },{
        "shoppingCartId": "59a39ced278ddd1f9dd7eddb",
        "goodsCode": "599fc0ef7975f910877e6e36",
        "goodsName": "我真的是日了狗了"
      }],
      useruuid: useruuid
    }
  ```

- 删除：删除购物车内商品，支持批量
  - url: /shoppingCart/removeGoods,
  - Type: POST
  - request:
  ```javascript
    {
      goodsuuids: [
        '59a39cef278ddd1f9dd7ede4', '59a39cef278ddd1f9dd7ede5'
      ],
      useruuid: useruuid
    }
  ```

## 订单类
- 查看订单列表
  - url: /order/getOrder/:useruuid
  - Type: GET

- 查看单个订单
  - url: /order/getOrder/:useruuid/:orderid
  - Type: GET

- 新增单个订单和新增批量订单，交给S端计算
  - url: /order/addOrder
  - Type: POST
  - request:
  ```javascript
    {
      goods: [
        {
          goodsCode: '599fc0ef7975f910877e6e36',
          goodsName: '矿泉水', //商品名称
          goodsSummary: '一瓶矿泉水', // 商品简介
          goodsImg: '目前没有', //商品图片
          goodsPrice: 300, // 商品标价
          goodsType: 2, // 商品分类
          goodsNumber: 2, // 商品数量
          goodsAttrs: ['300ML'], // 商品属性
          supplierUsername: 'admin', //供货商名称
          supplierNickname: '第二个大傻逼', //供货商名称
        }
      ],
      useruuid: useruuid
    }
  ```

- 提交订单
  - url: /order/saveOrder
  - Type: POST
  - request:
  ```javascript
    {
      goods: [
        {
          goodsCode: "599fc0ef7975f910877e6e36",
          goodsName: "矿泉水",
          goodsSummary: "一瓶矿泉水",
          goodsImg: "目前没有",
          goodsPrice: 300,
          goodsType: 2,
          goodsNumber: 2,
          goodsAttrs: ["300ML"],
          supplierUsername: "admin",
          supplierNickname: "第二个大傻逼"
        }
      ],
      useruuid: useruuid,
      orderTotal: 600,
      actuaPayment: 600
    }
  ```

- 删除订单
  - url: /order/removeOrder/:useruuid/:orderid
  - Type: GET

## 商品类
- 查询售卖商品
  - url: /goods/getGoodsList
  - Type: GET
  - query:
  ```javascript
    {
      currentPage = 1;
      pageSize = 10;
      goods：id，
      name：string
    }==> ?currentPage=1&pageSize=10&goods=id&name=string
  ```

- 查询售卖商品单个信息
  - url: /goods/getGoods/:goodsuuid
  - Type: GET

- 添加售卖商品
  - url: /goods/addGoods
  - Type: POST
  - request:
  ```javascript
    {
      goodsName: '矿泉水', //商品名称
      goodsSummary: '一瓶矿泉水', // 商品简介
      goodsImg: '目前没有', //商品图片
      goodsPrice: 300, // 商品标价
      goodsType: 2, // 商品分类
      goodsStock: 9999, // 商品库存
      // 商品属性
      goodsAttrs: [
        {
          name: '规格',
          value: ['300ML', '500ML', '1L', '3L']
        }
      ],
      supplier: useruuid
    }
  ```
- 修改售卖商品
  - url: /goods/editGoods
  - Type: POST
  - request:
  ```javascript
    {
      goodsuuid: '599fc0ef7975f910877e6e36',
      goodsName: '矿泉水', //商品名称
      goodsSummary: '这真的是他妈一瓶矿泉水', // 商品简介
      goodsImg: '', //商品图片
      goodsPrice: null, // 商品标价
      goodsType: null, // 商品分类
      goodsStock: null // 商品库存
    }
  ```
- 删除售卖商品, 支持批量
  - url: /goods/removeGoods
  - Type: POST
  - request:
  ```javascript
    {
      goodsuuids: ['599fc57e148833122ae1df20', '599fc575148833122ae1df1e']
    }
  ```


