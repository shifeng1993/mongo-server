
class utils {
  static data() {
    return {
      userTypes: ['系统管理员', '用户', '商户'],
      orderStates: ['待付款', '已付款', '待发货', '已发货', '待收货', '已收货']
    }
  }
  static getParams(params) {
    let names = [];
    for (let item in params) {
      names.push(item)
    }
    for (let i = 0; i < names.length; i++) {
      if (!params[names[i]]) {
        delete params[names[i]]
      }
      if(names[i] === 'pageSize'){
        delete params.pageSize;
      } else if(names[i] === 'currentPage'){
        delete params.currentPage
      }
    }
    return params
  }
  static getUuid(uuid) {
    return uuid.split('_')
  }
  static setUuid(uuid, userType) {
    return uuid + '_' + userType
  }
}
module.exports = utils;