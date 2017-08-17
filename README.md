待添加特性：

一、用户类，
    1.用户注册
        用户唯一id
        用户账号
        用户密码
        用户可变名称
        用户手机号码
    2.用户登录
        登录可用手机号和账号任意
    3.用户详情页
    4.用户收藏模块
    5.用户购物车模块
    6.用户订单模块
        增删改查订单
二、商品类
    1.商品列表模块
        商品简略属性
    2.商品信息信息模块
        商品详细属性，
        直接购买，
        添加喜欢，
        添加购物车
    3.模糊搜索模块，主要是在商品页中搜索商品

mongodb 模型设计，


以下关于时间全部用时间戳存储，状态全部为int 从0开始，分页全部从1开始
关于金额， 全部用int类型存储，，单位为分，前端进行转换处理。
1.用户类
user: [{
    userId: int,      // 用户唯一id
    userName: String, // 账号
    userphone: String, // 手机
    password: String, // 密码
    nickname: String, // 昵称
    summary: String,  //简介
    userImg: String // 头像
    用户名，密码，电话，邮箱，身份证号，地址，姓名，昵称
    // 订单集合 
    orders:[{
        orderId: int, // 订单编号
        orderState: int,  //订单状态
        createTime: timestamp  // 订单创建时间
        dealTime: timestamp   // 订单成交时间
        orderTotal: int,  // 订单总价
        actuaPayment: int // 实付款
        // 商品简单属性
        goodsInfo: [{
            goodsId: int, //商品id
            goodsName: String, //商品名称
            goodsSummary: String, // 商品简介
            goodsImg: String  //商品图片
            goodsPrice: int // 商品标价
        }]
    }],
    // 购物车集合
    shoppingCart: [{
        goodsId: int, //商品id
        goodsName: String, //商品名称
        goodsSummary: String, // 商品简介
        goodsImg: String  //商品图片
        goodsPrice: int // 商品标价
        goodsAttrs: []
    }]
}]

goods: [
    {
        goodsId: int, //商品id
        goodsName: String, //商品名称
        goodsSummary: String, // 商品简介
        goodsImg: String  //商品图片
        goodsPrice: int // 商品标价
        goodsInfo: []
    }
]

businessmans: [
    {
        
    }
]