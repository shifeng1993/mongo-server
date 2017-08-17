

const testModel = require("../../models/mock/index.js");

class indexController {
    /*mock数据示例*/
    // 获取商品
    static async goods(ctx, next) {
        await next();
        const callback = (res) => {
            ctx.response.body = res;
        }
        testModel.goods('goods', res => callback(res));
    }
}
module.exports = indexController;