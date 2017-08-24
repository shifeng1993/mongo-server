const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  username: String, // 账号
  userphone: String, // 手机
  password: String, // 密码
  nickname: String, // 昵称
  summary: String, //简介
  userImg: String, // 头像
  orders: [{
    type: ObjectId,
    ref: 'Order'
  }],
  shoppingCart: [{
    type: ObjectId,
    ref: 'shoppingCart'
  }]
}, {versionKey: false})
module.exports = mongoose.model('User', UserSchema);