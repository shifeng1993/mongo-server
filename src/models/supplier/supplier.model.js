const mongoose = require('mongoose');
const SupplierSchema = new mongoose.Schema({
  userName: String, // 账号
  userphone: String, // 手机
  password: String, // 密码
  nickname: String, // 昵称
  summary: String, //简介
  userImg: String, // 头像
}, {versionKey: false})
module.exports = mongoose.model('Supplier', SupplierSchema);