const Router = require('express');
const router = new Router();

const productRouter = require('./productRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const typeBrandRouter = require('./typeBrandRouter');

// Можно добавить другие связанные роутеры, если есть

router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/product', productRouter);
router.use('/type-brand', typeBrandRouter);

module.exports = router;