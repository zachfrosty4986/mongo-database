const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// Define routes for the User model
router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Define routes for adding and removing friends
router.route('/:userId/friends/:friendId')
  .post(addFriend)   // Route to add a new friend
  .delete(removeFriend); // Route to remove a friend

module.exports = router;