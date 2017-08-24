const mongoose = require('mongoose');
const UserModel = mongoose.model('User');

class shoppingCartController {
  static async getGoods(ctx, next) {
    if (!ctx.request.body.title || !ctx.request.body.content) {
      return next(ctx.throw(400, 'params error'));
    }
    const doc = await UserModel.find({title: ctx.request.query.title, content: ctx.request.query.content});
    ctx.body = "插入成功"
  }
  static async addGoods(ctx, next) {

  }
  static async editGoods(ctx, next) {

  }
  static async removeGoods(ctx, next) {

  }
}
module.exports = shoppingCartController;