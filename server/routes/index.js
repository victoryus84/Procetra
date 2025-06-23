const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const catalogRouter = require('./catalogRouter');

router.use('/user', userRouter);
router.use('/', catalogRouter); 

module.exports = router;