const mongoose = require('mongoose');
const SupplierSchema = new mongoose.Schema({
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
  gender: String, // 性别
  summary: String, //简介
  userImg: String, // 头像
  editTime: {
    type: Date,
    default: Date.now
  }
}, {versionKey: false})
module.exports = mongoose.model('Supplier', SupplierSchema);