const mongoose = require('mongoose');
const ShoppingCartSchema = new mongoose.Schema({
  goodsCode: String, //商品id
  goodsName: String, //商品名称
  goodsSummary: String, // 商品简介
  goodsImg: String,  //商品图片
  goodsType: Number, // 商品分类
  goodsPrice: Number, // 商品标价
  supplierUsername: String, // 供货商id
  supplierNickname: String, //供货商名称
  goodsAttrs: [String],  // 商品属性
  goodsNumber: Number, // 商品数量
  editTime: {
    type: Date,
    default: Date.now
  }
}, {versionKey: false})
module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema);