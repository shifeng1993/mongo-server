const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const OrderModel = mongoose.model('Order');
const utils = require('../../utils')
const Data = utils.data()

class orderController {
  static async getOrder(ctx, next) {
    const params = await utils.getParams(ctx.params);
    if (!params.useruuid) {
      return next(ctx.throw(400, 'params error'));
    }
    let obj = null;
    try {
      if (!params.orderuuid) {
        const useruuid = await utils.getUuid(params.useruuid)[0]
        const getuserdoc = await UserModel.findOne({
          _id: useruuid
        }, {password: 0}).populate('orders', {_id: 0});
        obj = JSON.stringify(getuserdoc.orders)
      } else {
        const getorderdoc = await OrderModel
          .findOne({_id: params.orderuuid})
          .populate('goods', {_id: 0});
        obj = JSON.stringify(getorderdoc)
      }
    } catch (error) {
      console.log(error)
      obj = {
        error: error,
        msg: 'server error'
      };
    }
    ctx.body = obj
  }
  // 算钱的
  static async addOrder(ctx, next) {
    const body = await utils.getParams(ctx.request.body);
    if (!body.goods) {
      return next(ctx.throw(400, 'params error'));
    }
    let obj = null;
    try {
      const useruuid = await utils.getUuid(body.useruuid)[0]
      let userType = await parseInt(utils.getUuid(body.useruuid)[1])
      let orderTotal = 0;
      for (let i = 0; i < body.goods.length; i++) {
        orderTotal += body.goods[i].goodsPrice * body.goods[i].goodsNumber
      }
      body.orderTotal = orderTotal; // 订单总价
      body.actuaPayment = orderTotal; // 实付款
      switch (userType) {
        case 1:
          obj = JSON.stringify(body);
          break;
        default:
          obj = {
            message: 'user type nothing~'
          }
      }
    } catch (error) {
      console.log(error)
      obj = {
        error: error,
        msg: 'server error'
      };
    }
    ctx.body = obj
  }
  // 提交订单的
  static async saveOrder(ctx, next) {
    const body = await utils.getParams(ctx.request.body);
    if (!body.goods) {
      return next(ctx.throw(400, 'params error'));
    }
    let obj = null;
    try {
      const useruuid = await utils.getUuid(body.useruuid)[0]
      let userType = await parseInt(utils.getUuid(body.useruuid)[1])
      body.orderState = 0 // 订单状态
      body.createTime = new Date(); // 订单创建时间
      switch (userType) {
        case 1:
          const orderdoc = await OrderModel.create(body);
          const updateuserdoc = await UserModel.update({
            _id: useruuid
          }, {
            '$push': {
              'orders': orderdoc.id
            }
          });
          obj = {
            message: 'saveOrder success'
          }
          break;
        default:
          obj = {
            message: 'user type nothing~'
          }
      }
    } catch (error) {
      console.log(error)
      obj = {
        error: error,
        msg: 'server error'
      };
    }
    ctx.body = obj
  }
  static async removeOrder(ctx, next) {
    const params = await utils.getParams(ctx.params);
    const getorderdoc = await OrderModel.findOne({_id: params.orderuuid})
    if (!params.useruuid || !params.orderuuid || !getorderdoc) {
      return next(ctx.throw(400, 'params error'));
    }
    let obj = null;
    try {
      const useruuid = await utils.getUuid(params.useruuid)[0]
      const orderdoc = await OrderModel.remove({_id: params.orderuuid});
      const updateuserdoc = await UserModel.update({
        _id: useruuid
      }, {
        '$pull': {
          'orders': params.orderuuid
        }
      });
      obj = {
        message: 'saveOrder success'
      }
    } catch (error) {
      console.log(error)
      obj = {
        error: error,
        msg: 'server error'
      };
    }
    ctx.body = obj
  }
}
module.exports = orderController;