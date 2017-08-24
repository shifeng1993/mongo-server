const mongoose = require('mongoose');
const ShoppingCartSchema = new mongoose.Schema({
  goodsCode: String, //商品id
  goodsName: String, //商品名称
  goodsSummary: String, // 商品简介
  goodsImg: String,  //商品图片
  goodsPrice: Number, // 商品标价
  supplierId: String, // 供货商id
  supplierNickname: String, //供货商名称
  goodsAttrs: [String],  // 商品属性
  goodsNumber: Number, // 商品数量
  createTime: Date   //加入时间
}, {versionKey: false})
module.exports = mongoose.model('shoppingCart', ShoppingCartSchema);