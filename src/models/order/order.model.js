const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  orderState: Number,  //订单状态
  createTime: Date,  // 订单创建时间
  dealTime: Date,   // 订单成交时间
  orderTotal: Number,  // 订单总价
  actuaPayment: Number, // 实付款
  // 订单中商品详情
  goods: [{
    goodsCode: String, //商品id
    goodsName: String, //商品名称
    goodsSummary: String, // 商品简介
    goodsImg: String,  //商品图片
    goodsPrice: Number, // 商品标价
    goodsNumber: Number, // 商品数量
    supplierUsername: String, // 供货商账号
    supplierNickname: String, //供货商名称
    goodsType: Number, // 商品分类
    goodsAttrs: [String]  // 商品属性
  }]
}, {versionKey: false})
module.exports = mongoose.model('Order', OrderSchema);