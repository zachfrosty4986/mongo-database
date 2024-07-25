// Import the Router class from the express library
const router = require('express').Router();

// Import the API routes defined in the 'api' module
const apiRoutes = require('./api');

// Use the API routes for any request that starts with '/api'
// This sets up the routing for the '/api' endpoint, delegating requests to the apiRoutes module
router.use('/api', apiRoutes);

// Define a catch-all route for any requests that do not match the above routes
// This sends a response indicating that the route is not found
router.use((req, res) => res.send('Wrong route!'));

// Export the router to be used in the main application file
module.exports = router;

