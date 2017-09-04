axios.defaults.baseURL = 'http://192.168.212.60:3333/api';

const useruuid = '599fb36fe453e30b5e484a78_1'

let getOrderlist = () => {
  axios
    .get('/order/getOrder/' + useruuid)
    .then((res) => {
      console.log(res)
    })
    .catch((err, doc) => {
      console.log(err)
    })
}
const orderuuid = '59a3791c9514640f1f4aaac7'
let getOrder = () => {
  axios
    .get('/order/getOrder/' + useruuid + '/' + orderuuid)
    .then((res) => {
      console.log(res)
    })
    .catch((err, doc) => {
      console.log(err)
    })
}

let addOrder = () => {
  const params = {
    goods: [
      {
        goodsCode: '599fc0ef7975f910877e6e36',
        goodsName: '矿泉水', //商品名称
        goodsSummary: '一瓶矿泉水', // 商品简介
        goodsImg: '目前没有', //商品图片
        goodsPrice: 300, // 商品标价
        goodsType: 2, // 商品分类
        goodsNumber: 2, // 商品数量
        goodsAttrs: ['300ML'], // 商品属性
        supplierUsername: 'admin', //供货商名称
        supplierNickname: '第二个大傻逼', //供货商名称
      }
    ],
    useruuid: useruuid
  }
  axios
    .post('/order/addOrder', params)
    .then((res) => {
      console.log(res)
    })
    .catch((err, doc) => {
      console.log(err)
    })
}
let saveOrder = () => {
  const params = {
    "goods": [
      {
        "goodsCode": "599fc0ef7975f910877e6e36",
        "goodsName": "矿泉水",
        "goodsSummary": "一瓶矿泉水",
        "goodsImg": "目前没有",
        "goodsPrice": 300,
        "goodsType": 2,
        "goodsNumber": 2,
        "goodsAttrs": ["300ML"],
        "supplierUsername": "admin",
        "supplierNickname": "第二个大傻逼"
      }
    ],
    useruuid: useruuid,
    "orderTotal": 600,
    "actuaPayment": 600
  }
  axios
    .post('/order/saveOrder', params)
    .then((res) => {
      console.log(res)
    })
    .catch((err, doc) => {
      console.log(err)
    })
}

let removeOrder = () => {
  axios
    .get('/order/removeOrder/' + useruuid + '/' + orderuuid)
    .then((res) => {
      console.log(res)
    })
    .catch((err, doc) => {
      console.log(err)
    })
}

let app = () => {
  return {
    init() {
      this.Controller();
    },
    Controller() {
      getOrderlist()
      // getOrder() 
      // addOrder() 
      // saveOrder() 
      // removeOrder()
    }
  };
};

app().init();