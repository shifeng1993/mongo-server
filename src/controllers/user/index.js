const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const SupplierModel = mongoose.model('Supplier');
const utils = require('../../utils')
const Data = utils.data()
class userController {

  static async signIn(ctx, next) {
    const body = await utils.getParams(ctx.request.body);
    if (!body.username || !body.password) {
      return next(ctx.throw(400, 'params error'));
    }
    let obj = null;
    try {
      const userdoc = await UserModel.findOne({username: body.username});
      if (!userdoc) {
        const supplierdoc = await SupplierModel.findOne({username: body.username});
        if (!supplierdoc) {
          obj = {
            message: '登录失败，用户不存在'
          }
        } else {
          if (supplierdoc.password == body.password) {
            obj = {
              message: '登录成功',
              useruuid: utils.setUuid(supplierdoc._id, 2)
            }
          } else {
            obj = {
              message: '登录失败，密码错误'
            }
          }
        }
      } else {
        if (userdoc.password == body.password) {
          obj = {
            message: '登录成功',
            useruuid: utils.setUuid(userdoc._id, 1)
          }
        } else {
          obj = {
            message: '登录失败，密码错误'
          }
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
  static async signUp(ctx, next) {
    const body = await utils.getParams(ctx.request.body);
    if (!body.username || !body.password || !body.userphone || !body.nickname || !body.userType || body.userType === '系统管理员') {
      return next(ctx.throw(400, 'params error'));
    }
    let obj = null;
    try {
      let userType = await Data.userTypes.indexOf(body.userType);
      switch (userType) {
        case 1:
          const userdoc = await UserModel.create(body);
          obj = {
            message: 'signUp success'
          }
          break;
        case 2:
          const supplierdoc = await SupplierModel.create(body);
          obj = {
            message: 'signUp success'
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
  static async getUserInfo(ctx, next) {
    if (!ctx.params.useruuid) {
      return next(ctx.throw(400, 'params error'));
    }
    let obj = null;
    try {
      const useruuid = await utils.getUuid(ctx.params.useruuid)[0]
      const userType = await parseInt(utils.getUuid(ctx.params.useruuid)[1])
      switch (userType) {
        case 1:
          const userdoc = await UserModel.findOne({
            _id: useruuid
          }, {
            password: 0,
            _id: 0
          });
          obj = JSON.stringify(userdoc);
          break;
        case 2:
          const supplierdoc = await SupplierModel.findOne({
            _id: useruuid
          }, {
            password: 0,
            _id: 0
          });
          obj = JSON.stringify(supplierdoc);
          break;
        default:
          obj = {
            message: 'user nothing~'
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
  static async setUserInfo(ctx, next) {
    const body = await utils.getParams(ctx.request.body);
    if (!body.useruuid) {
      return next(ctx.throw(400, 'params error'));
    }
    let obj = null;
    try {
      const useruuid = await utils.getUuid(body.useruuid)[0]
      const userType = await parseInt(utils.getUuid(body.useruuid)[1])
      switch (userType) {
        case 1:
          await UserModel.update({
            _id: useruuid
          }, body);
          const userdoc = await UserModel.findOne({
            _id: useruuid
          }, {
            password: 0,
            _id: 0
          });
          obj = JSON.stringify(userdoc);
          break;
        case 2:
          await SupplierModel.update({
            _id: useruuid
          }, body);
          const supplierdoc = await SupplierModel.findOne({
            _id: useruuid
          }, {
            password: 0,
            _id: 0
          });
          obj = JSON.stringify(supplierdoc);
          break;
        default:
          obj = {
            message: 'user nothing~'
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
}
module.exports = userController;