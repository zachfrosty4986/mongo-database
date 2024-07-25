// Import the User and Thought models
const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
  // Create a new user
  async createUser(req, res) {
    try {
      // Create a new User document using the data from the request body
      const newUser = await User.create(req.body);
      // Respond with the newly created user
      res.status(200).json(newUser);
    } catch (err) {
      // Handle any errors that occur and respond with a 500 status code
      res.status(500).json(err);
    }
  },

  // Get all users
  async getAllUsers(req, res) {
    try {
      // Retrieve all User documents from the database
      const users = await User.find();
      // Respond with the list of all users
      res.status(200).json(users);
    } catch (err) {
      // Handle any errors that occur and respond with a 500 status code
      res.status(500).json(err);
    }
  },

  // Get a single user by ID
  async getUserById(req, res) {
    try {
      // Find a User document by its ID, including populated thoughts and friends
      const user = await User.findById(req.params.userId)
        .populate('thoughts') // Populate the user's thoughts
        .populate('friends'); // Populate the user's friends

      // If no user is found, respond with a 404 status code and an error message
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Respond with the found user
      res.status(200).json(user);
    } catch (err) {
      // Handle any errors that occur and respond with a 500 status code
      res.status(500).json(err);
    }
  },

  // Update a user by ID
  async updateUser(req, res) {
    try {
      // Find a User document by its ID and update it with the data from the request body
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true } // Return the updated document
      );

      // If no user is found, respond with a 404 status code and an error message
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Respond with the updated user
      res.status(200).json(updatedUser);
    } catch (err) {
      // Handle any errors that occur and respond with a 500 status code
      res.status(500).json(err);
    }
  },

  // Delete a user by ID
  async deleteUser(req, res) {
    try {
      // Find a User document by its ID and delete it
      const deletedUser = await User.findByIdAndDelete(req.params.userId);

      // If no user is found, respond with a 404 status code and an error message
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Remove all thoughts associated with the deleted user
      await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });

      // Respond with a success message indicating the user has been deleted
      res.status(200).json({ message: 'User deleted' });
    } catch (err) {
      // Handle any errors that occur and respond with a 500 status code
      res.status(500).json(err);
    }
  },

  // Add a friend to a user's friend list
  async addFriend(req, res) {
    try {
      // Find a User document by its ID and add the friend ID to the user's friends list
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } }, // Add the friend ID if not already present
        { new: true } // Return the updated document
      ).populate('friends'); // Populate the user's friends

      // If no user is found, respond with a 404 status code and an error message
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Respond with the updated user including the new friend
      res.status(200).json(user);
    } catch (err) {
      // Handle any errors that occur and respond with a 500 status code
      res.status(500).json(err);
    }
  },

  // Remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      // Find a User document by its ID and remove the friend ID from the user's friends list
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } }, // Remove the specified friend ID
        { new: true } // Return the updated document
      ).populate('friends'); // Populate the user's friends

      // If no user is found, respond with a 404 status code and an error message
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Respond with the updated user after removing the friend
      res.status(200).json(user);
    } catch (err) {
      // Handle any errors that occur and respond with a 500 status code
      res.status(500).json(err);
    }
  },
};
