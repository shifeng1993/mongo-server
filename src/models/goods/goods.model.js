const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  userName: String, // 账号
  userphone: String, // 手机
  password: String, // 密码
  nickname: String, // 昵称
  summary: String, //简介
  userImg: String, // 头像
  orders: [{
    orderCode: Number, // 订单编号
    orderState: Number,  //订单状态
    createTime: Date,  // 订单创建时间
    dealTime: Date,   // 订单成交时间
    orderTotal: Number,  // 订单总价
    actuaPayment: Number, // 实付款
    // 订单中商品详情
    goodsInfo: [{
      goodsId: Number, //商品id
      goodsName: String, //商品名称
      goodsSummary: String, // 商品简介
      goodsImg: String,  //商品图片
      goodsPrice: Number, // 商品标价
      goodsAttrs: [],  // 商品属性
    }],
  }],
  shoppingCart: [{
    goodsCode: String,  //商品编码
    goodsName: String, //商品名称
    goodsSummary: String, // 商品简介
    goodsImg: String,  //商品图片
    goodsPrice: Number, // 商品标价
    goodsType: Number, // 商品分类
    goodsNumber: Number, // 商品数量
    createTime: Date,   //加入时间
    goodsAttrs: [],  // 商品属性
  }]
}, {versionKey: false})
module.exports = mongoose.model('User', UserSchema);