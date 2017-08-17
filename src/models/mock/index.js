// mock假数据模块
const Mock = require('mockjs');

class testModel {
    // 用户登录
    static async goods(params, res) {
        const data = Mock.mock([
            {
                id: 11,
                name: '矿泉水',
                price: '200'
            }, {
                id: 12,
                name: '奶茶',
                price: '200'
            }, {
                id: 13,
                name: '咖啡',
                price: '200'
            }
        ])
        res(JSON.stringify(data))
        // await ……
    }

}
module.exports = testModel;