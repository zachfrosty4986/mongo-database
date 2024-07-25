// Import the Router class from the express library
const router = require('express').Router();

// Import the route handlers for thoughts and users
const thoughtsRoutes = require('./thoughtsRoutes');
const userRoutes = require('./userRoutes');

// Define routes for handling requests to '/thoughts'
// Use the routes defined in thoughtsRoutes.js for these requests
router.use('/thoughts', thoughtsRoutes);

// Define routes for handling requests to '/user'
// Use the routes defined in userRoutes.js for these requests
router.use('/user', userRoutes);

// Export the router to be used in the main application file
module.exports = router;
