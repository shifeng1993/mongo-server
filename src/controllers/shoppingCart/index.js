const mongoose = require('mongoose');
const ShoppingCartModel = mongoose.model('ShoppingCart');
const UserModel = mongoose.model('User');
const utils = require('../../utils')
const Data = utils.data()

class shoppingCartController {
  static async getGoods(ctx, next) {
    const params = await utils.getParams(ctx.params);
    if (!params.useruuid) {
      return next(ctx.throw(400, 'params error'));
    }
    let obj = null;
    try {
      const useruuid = await utils.getUuid(params.useruuid)[0]
      let userType = await parseInt(utils.getUuid(params.useruuid)[1])
      switch (userType) {
        case 1:
          const doc = await UserModel.findOne({
            _id: useruuid
          }, {
            password: 0,
            _id: 0
          }).populate('shoppingCart');
          obj = JSON.stringify(doc.shoppingCart);
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
  static async addGoods(ctx, next) {
    const body = await utils.getParams(ctx.request.body);
    if (!body.goods) {
      return next(ctx.throw(400, 'params error'));
    }
    let obj = null;
    try {
      const useruuid = await utils.getUuid(body.useruuid)[0]
      let userType = await parseInt(utils.getUuid(body.useruuid)[1])
      switch (userType) {
        case 1:
          const getuserdoc = await UserModel.findOne({_id: useruuid});
          if (getuserdoc.shoppingCart.length < 100) {
            const ShoppingCartdoc = await ShoppingCartModel.create(body.goods)
            const updateuserdoc = await UserModel.update({
              _id: useruuid
            }, {
              '$push': {
                'shoppingCart': ShoppingCartdoc.id
              }
            });
          } else {
            await ShoppingCartModel.remove({_id: getuserdoc.shoppingCart[0]})
            const ShoppingCartdoc = await ShoppingCartModel.create(body.goods)
            await UserModel.update({
              _id: useruuid
            }, {
              '$pull': {
                'shoppingCart': getuserdoc.shoppingCart[0]
              }
            });
            await UserModel.update({
              _id: useruuid
            }, {
              '$push': {
                'shoppingCart': ShoppingCartdoc.id
              }
            });
          }
          obj = {
            message: 'addGoods success'
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
  static async editGoods(ctx, next) {
    const body = await utils.getParams(ctx.request.body);
    if (!body.useruuid) {
      return next(ctx.throw(400, 'params error'));
    }
    let obj = null;
    try {
      for (let i = 0; i < body.goods.length; i++) {
        await ShoppingCartModel.update({
          _id: body.goods[i].shoppingCartId
        }, body.goods[i]);
      }
      obj = {
        message: 'editGoods success'
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
  static async removeGoods(ctx, next) {
    const body = await utils.getParams(ctx.request.body);
    const getgoodsdoc = await ShoppingCartModel.find({
      '_id': {
        $in: body.goodsuuids
      }
    })
    if (!body.goodsuuids || !getgoodsdoc || getgoodsdoc.length === 0 || !body.useruuid) {
      return next(ctx.throw(400, 'params error'));
    }
    let obj = null;
    try {
      const useruuid = await utils.getUuid(body.useruuid)[0]
      let userType = await parseInt(utils.getUuid(body.useruuid)[1])
      const userdoc = await UserModel.update({
        _id: useruuid
      }, {
        '$pull': {
          'shoppingCart': body.goodsuuids
        }
      });
      const ShoppingCartdoc = await ShoppingCartModel.remove({
        '_id': {
          $in: body.goodsuuids
        }
      });
      obj = {
        message: 'removeGoods success'
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
module.exports = shoppingCartController;