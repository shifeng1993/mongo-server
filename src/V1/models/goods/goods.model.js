const mongoose = require('mongoose');
const GoodsSchema = new mongoose.Schema({
  goodsCode: String,  //商品编码
  goodsName: String, //商品名称
  goodsSummary: String, // 商品简介
  goodsImg: String,  //商品图片
  goodsPrice: Number, // 商品标价
  goodsType: Number, // 商品分类
  goodsNumber: Number, // 商品数量
  createTime: Date,   //加入时间
  goodsAttrs: [],  // 商品属性
  // 供货商
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier'
  }
}, {versionKey: false})
module.exports = mongoose.model('Goods', GoodsSchema);