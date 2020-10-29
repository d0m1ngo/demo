const router = require('express').Router();

router.use('/jobs', require('./jobs'));
router.use('/processes', require('./processes'));

module.exports = router;