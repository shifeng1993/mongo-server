const mongoose = require('mongoose');
const GoodsModel = mongoose.model('Goods');
const utils = require('../../utils')
const Data = utils.data()

class goodsController {
  static async getGoodsList(ctx, next) {
    if (!ctx.request.query.currentPage || !ctx.request.query.pageSize) {
      return next(ctx.throw(400, 'params error'));
    }
    const currentPage = parseInt(ctx.request.query.currentPage)
    const pageSize = parseInt(ctx.request.query.pageSize);
    let obj = null;
    try {
      const query = await utils.getParams(ctx.request.query);
      const doc = await GoodsModel
        .find(query)
        .populate('goodsAttrs', {_id: 0})
        .populate('supplier', {
          password: 0,
          _id: 0,
          editTime: 0
        })
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize)
        .sort({'_id': -1})
        .exec();
      const total = await GoodsModel.count();
      obj = JSON.stringify({data: doc, currentPage: currentPage, pageSize: pageSize, pageTotal: total})
    } catch (error) {
      console.log(error)
      obj = {
        error: error,
        msg: 'server error'
      };
    }
    ctx.body = obj
  }
  static async getGoods(ctx, next) {
    if (!ctx.params.goodsuuid) {
      return next(ctx.throw(400, 'params error'));
    }
    let obj = null;
    try {
      const doc = await GoodsModel.findOne({
        _id: ctx.params.goodsuuid
      }, {
          password: 0,
          _id: 0
        })
        .populate('goodsAttrs', {_id: 0})
        .populate('supplier', {
          _id: 0,
          password: 0,
          editTime: 0
        });
      obj = JSON.stringify(doc)
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
    if (!body.goodsName || !body.goodsSummary || !body.goodsImg || !body.goodsPrice || !body.goodsType || !body.goodsStock || !body.goodsAttrs || !body.supplier) {
      return next(ctx.throw(400, 'params error'));
    }
    let obj = null;
    try {
      let userType = await parseInt(utils.getUuid(body.supplier)[1])
      body.supplier = await utils.getUuid(body.supplier)[0]
      if (userType === 2) {
        const doc = await GoodsModel.create(body);
        obj = {
          message: 'addGoods success'
        }
      } else {
        obj = {
          message: 'userType error'
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
    if (!body.goodsuuid) {
      return next(ctx.throw(400, 'params error'));
    }
    let obj = null;
    try {
      const doc = await GoodsModel.update({
        _id: body.goodsuuid
      }, body);
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
    const getgoodsdoc = await GoodsModel.find({
      '_id': {
        $in: body.goodsuuids
      }
    })
    if (!body.goodsuuids || !getgoodsdoc) {
      return next(ctx.throw(400, 'params error'));
    }
    let obj = null;
    try {
      const doc = await GoodsModel.remove({
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
module.exports = goodsController;
