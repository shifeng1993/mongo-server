axios.defaults.baseURL = 'http://localhost:3333/api';

let getGoodsList = () => {
  axios
    .get('/goods/getGoodsList?goodsName=矿泉水')
    .then((res) => {
      console.log(res)
    })
    .catch((err, doc) => {
      console.log(err)
    })
}

const goodsuuid = '599fc0ef7975f910877e6e36'
let getGoods = () => {
  axios
    .get('/goods/getGoods/' + goodsuuid)
    .then((res) => {
      console.log(res)
    })
    .catch((err, doc) => {
      console.log(err)
    })
}
let useruuid = '599f99f2f7ca72710fbc9b67_2'
let addGoods = () => {
  const params = {
    goodsName: '矿泉水', //商品名称
    goodsSummary: '一瓶矿泉水', // 商品简介
    goodsImg: '目前没有', //商品图片
    goodsPrice: 300, // 商品标价
    goodsType: 2, // 商品分类
    goodsStock: 9999, // 商品库存
    // 商品属性
    goodsAttrs: [
      {
        name: '规格',
        value: ['300ML', '500ML', '1L', '3L']
      }
    ],
    supplier: useruuid
  }
  axios
    .post('/goods/addGoods', params)
    .then((res) => {
      console.log(res)
    })
    .catch((err, doc) => {
      console.log(err)
    })
}
let editGoods = () => {
  const params = {
    goodsuuid: goodsuuid,
    goodsName: '矿泉水', //商品名称
    goodsSummary: '这真的是他妈一瓶矿泉水', // 商品简介
    goodsImg: '', //商品图片
    goodsPrice: null, // 商品标价
    goodsType: null, // 商品分类
    goodsStock: null // 商品库存
  }
  axios
    .post('/goods/editGoods', params)
    .then((res) => {
      console.log(res)
    })
    .catch((err, doc) => {
      console.log(err)
    })
}

let removeGoods = () =>{
  const params = {
    goodsuuids: ['599fc57e148833122ae1df20', '599fc575148833122ae1df1e']
  }
  axios
  .post('/goods/removeGoods', params)
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
      getGoodsList()
      // getGoods()
      // addGoods()
      // editGoods()
      // removeGoods()
    }
  };
};

app().init();