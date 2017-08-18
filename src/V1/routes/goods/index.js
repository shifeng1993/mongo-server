// 模块引入
const router = require('../index.js');
const controllers = require('../../controllers');

/* ================以下是api模块=============== */

// test
router.get('/test', controllers.mock.goods)


module.exports = router;
