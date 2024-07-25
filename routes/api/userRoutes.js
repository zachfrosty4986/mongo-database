// Import the Router class from the express library
const router = require('express').Router();

// Import the controller functions for handling user-related operations
const userController = require('../../controllers/userControllers');

// Define routes for handling requests to '/users'
// GET request to retrieve all users
// POST request to create a new user
router.route('/')
  .get(userController.getAllUsers)  // Retrieve all users
  .post(userController.createUser); // Create a new user

// Define routes for handling requests to '/users/:userId'
// GET request to retrieve a single user by ID, including populated thoughts and friends
// PUT request to update a user by ID
// DELETE request to delete a user by ID
router.route('/:userId')
  .get(userController.getUserById)    // Retrieve a user by ID with populated thoughts and friends
  .put(userController.updateUser)     // Update a user by ID
  .delete(userController.deleteUser); // Delete a user by ID

// Define routes for handling friend operations within a specific user
// POST request to add a new friend to the user's friend list
// DELETE request to remove a friend from the user's friend list
router.route('/:userId/friends/:friendId')
  .post(userController.addFriend)     // Add a friend to the user's friend list
  .delete(userController.removeFriend); // Remove a friend from the user's friend list

// Export the router to be used in the main application file
module.exports = router;
