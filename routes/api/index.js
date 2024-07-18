const router = require('express').Router();
const thoughtsRoutes = require('./thoughtsRoutes');
const userRoutes = require('./userRoutes');

router.use('/courses', thoughtsRoutes);
router.use('/students', userRoutes);

module.exports = router;