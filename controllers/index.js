const router = require('express').Router();

// Importing all route modules
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

// Using the route modules
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// Exporting the combined routes
module.exports = router;