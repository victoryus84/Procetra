const Router = require('express');
const router = new Router();
const typeBrandController = require('../controllers/typeBrandController');

router.post('/', typeBrandController.create);
router.get('/', typeBrandController.getAll);

module.exports = router;