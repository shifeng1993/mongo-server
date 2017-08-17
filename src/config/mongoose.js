//config/mongoose.js
const mongoose = require('mongoose');
const config = require('./config.js');
const models = require('../models/index.js');

// 设置全局v8promise
mongoose.Promise=global.Promise;

// 开启debug
mongoose.set('debug',true);

// 监控连接
mongoose.connection.on('error', (error) => {
  console.log('MongoDB连接错误：' + error)
})
mongoose.connection.once('open', (callback) => {
  console.log('MongoDB连接成功~~')
})

// 导出数据库
const db = () => {
  for(item in models)
  return mongoose.connect(config.mongodb, {
    useMongoClient: true
  });
}

module.exports = db;