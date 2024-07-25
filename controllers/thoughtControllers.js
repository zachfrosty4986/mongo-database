// Import the Thought and User models from their respective files
const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  // Create a new thought
  async createThought(req, res) {
    try {
      // Create a new Thought document using the request body
      const newThought = await Thought.create(req.body);

      // Find the User by userId and add the new thought's ID to the user's list of thoughts
      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: newThought._id } }
      );

      // Respond with the newly created thought
      res.status(200).json(newThought);
    } catch (err) {
      // Handle any errors that occur and respond with a 500 status code
      res.status(500).json(err);
    }
  },

  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      // Retrieve all Thought documents from the database
      const thoughts = await Thought.find();

      // Respond with the list of all thoughts
      res.status(200).json(thoughts);
    } catch (err) {
      // Handle any errors that occur and respond with a 500 status code
      res.status(500).json(err);
    }
  },

  // Get a single thought by ID
  async getThoughtById(req, res) {
    try {
      // Find a Thought document by its ID
      const thought = await Thought.findById(req.params.thoughtId);

      // If no thought is found, respond with a 404 status code and an error message
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      // Respond with the found thought
      res.status(200).json(thought);
    } catch (err) {
      // Handle any errors that occur and respond with a 500 status code
      res.status(500).json(err);
    }
  },

  // Update a thought by ID
  async updateThought(req, res) {
    try {
      // Find a Thought document by its ID and update it with the request body
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true } // Return the updated document
      );

      // If no thought is found, respond with a 404 status code and an error message
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      // Respond with the updated thought
      res.status(200).json(updatedThought);
    } catch (err) {
      // Handle any errors that occur and respond with a 500 status code
      res.status(500).json(err);
    }
  },

  // Delete a thought by ID
  async deleteThought(req, res) {
    try {
      // Find a Thought document by its ID and delete it
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);

      // If no thought is found, respond with a 404 status code and an error message
      if (!deletedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      // Remove the deleted thought's ID from all users' lists of thoughts
      await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } }
      );

      // Respond with a success message
      res.status(200).json({ message: 'Thought deleted' });
    } catch (err) {
      // Handle any errors that occur and respond with a 500 status code
      res.status(500).json(err);
    }
  },

  // Add a reaction to a thought
  async addReaction(req, res) {
    try {
      // Find a Thought document by its ID and add the new reaction to its list of reactions
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } }, // Add the reaction if it's not already present
        { new: true } // Return the updated document
      );

      // If no thought is found, respond with a 404 status code and an error message
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      // Respond with the updated thought including the new reaction
      res.status(200).json(thought);
    } catch (err) {
      // Handle any errors that occur and respond with a 500 status code
      res.status(500).json(err);
    }
  },

  // Remove a reaction from a thought
  async removeReaction(req, res) {
    try {
      // Find a Thought document by its ID and remove the reaction by its reactionId
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } }, // Remove the specified reaction
        { new: true } // Return the updated document
      );

      // If no thought is found, respond with a 404 status code and an error message
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      // Respond with the updated thought after removing the reaction
      res.status(200).json(thought);
    } catch (err) {
      // Handle any errors that occur and respond with a 500 status code
      res.status(500).json(err);
    }
  },
};

