const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const GoodsSchema = new mongoose.Schema({
  goodsName: String, //商品名称
  goodsSummary: String, // 商品简介
  goodsImg: String, //商品图片
  goodsPrice: Number, // 商品标价
  goodsType: Number, // 商品分类
  goodsStock: Number, // 商品库存
  editTime: {
    type: Date,
    default: Date.now
  },
  // 商品属性
  goodsAttrs: [
    {
      name: String,
      value: [String]
    }
  ],
  // 供货商
  supplier: {
    type: ObjectId,
    ref: 'Supplier'
  }
}, {versionKey: false})
module.exports = mongoose.model('Goods', GoodsSchema);