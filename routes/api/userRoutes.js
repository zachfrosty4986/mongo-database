const router = require('express').Router();
const userController = require('../../controllers/userControllers');

// GET and POST all users
router.route('/')
.get(userController.getAllUsers)
.post(userController.createUser)
// GET, PUT and DELETE a single user by its `_id` and populated thought and friend data
router.route('/:userId')
.get(userController.getUserById)
.put(userController.updateUser)
.delete(userController.deleteUser)

// ADD and DELETE friends 
router.route('/:userId/friends/:friendId')
  .post(userController.addFriend)   // Route to add a new friend
  .delete(userController.removeFriend); // Route to remove a friend

module.exports = router;