// 模块引入
const router = require('../index.js');
const controllers = require('../../controllers');

/* ================以下是api模块=============== */
// 创建测试
router.get('/create', controllers.user.create)

module.exports = router;
