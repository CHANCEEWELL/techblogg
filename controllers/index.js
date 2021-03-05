const router = require('express').Router();
const homeRoutes = require('./routes/homeRoutes');
const apiRoutes = require('./routes/api/apiRoutes');


router.use('/', homeRoutes);
router.use('/api', apiRoutes)

module.exports = router;