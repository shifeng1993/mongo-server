axios.defaults.baseURL = 'http://localhost:3333/api';

const useruuid = '599fb36fe453e30b5e484a78_1'

let addGoods = () => {
  const params = {
    goods: {
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
    },
    useruuid: useruuid
  }
  axios
    .post('/shoppingCart/addGoods', params)
    .then((res) => {
      console.log(res)
    })
    .catch((err, doc) => {
      console.log(err)
    })
}
let getGoods = () => {
  axios
    .get('/shoppingCart/getGoods/' + useruuid)
    .then((res) => {
      console.log(res)
    })
    .catch((err, doc) => {
      console.log(err)
    })
}

let editGoods = () => {
  const params = {
    goods: [{
      "shoppingCartId": "59a39ced278ddd1f9dd7edda",
      "goodsCode": "599fc0ef7975f910877e6e36",
      "goodsName": "这瓶矿泉水真的难喝"
    },{
      "shoppingCartId": "59a39ced278ddd1f9dd7eddb",
      "goodsCode": "599fc0ef7975f910877e6e36",
      "goodsName": "我真的是日了狗了"
    }],
    useruuid: useruuid
  }
  axios
    .post('/shoppingCart/editGoods', params)
    .then((res) => {
      console.log(res)
    })
    .catch((err, doc) => {
      console.log(err)
    })
}

let removeGoods = () => {
  const params = {
    goodsuuids: [
      '59a39cef278ddd1f9dd7ede4', '59a39cef278ddd1f9dd7ede5'
    ],
    useruuid: useruuid
  }
  axios
    .post('/shoppingCart/removeGoods', params)
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
      // addGoods() 
      // getGoods()
      editGoods()
      // removeGoods()
    }
  };
};

app().init();