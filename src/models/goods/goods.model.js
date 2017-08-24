const mongoose = require('mongoose');
const GoodsSchema = new mongoose.Schema({
  goodsName: String, //商品名称
  goodsSummary: String, // 商品简介
  goodsImg: String,  //商品图片
  goodsPrice: Number, // 商品标价
  goodsType: Number, // 商品分类
  goodsStock: Number, // 商品库存
  createTime: Date,   //加入时间
  // 商品属性
  goodsAttrs: [{
    name: String,
    value: [String]
  }],
  // 供货商
  supplier: {
    type: mongoose.Schema.ObjectId,
    ref: 'Supplier'
  }
}, {versionKey: false})
module.exports = mongoose.model('Goods', GoodsSchema);