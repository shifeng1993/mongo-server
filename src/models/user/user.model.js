const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  }, // 账号
  userphone: {
    type: String,
    unique: true
  }, // 手机
  password: String, // 密码
  nickname: String, // 昵称
  summary: String, //简介
  userImg: String, // 头像
  editTime: {
    type: Date,
    default: Date.now
  },
  orders: [
    {
      type: ObjectId,
      ref: 'Order'
    }
  ],
  shoppingCart: [
    {
      type: ObjectId,
      ref: 'ShoppingCart'
    }
  ]
}, {versionKey: false})
module.exports = mongoose.model('User', UserSchema);