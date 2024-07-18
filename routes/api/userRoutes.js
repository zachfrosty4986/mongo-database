const router = require('express').Router();
const userController = require('../../controllers/userController');

// GET all users
router.get('/', userController.getAllUsers);

// GET a single user by its `_id` and populated thought and friend data
router.get('/:userId', userController.getUserById);

// POST a new user
router.post('/', userController.createUser);

// PUT to update a user by its `_id`
router.put('/:userId', userController.updateUser);

// DELETE to remove user by its `_id`
router.delete('/:userId', userController.deleteUser);

module.exports = router;