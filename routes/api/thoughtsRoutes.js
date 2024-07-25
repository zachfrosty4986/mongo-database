// Import the Router class from the express library
const router = require('express').Router();

// Import the controller functions for handling thoughts
const {
  getAllThoughts,     // Controller function to get all thoughts
  getThoughtById,     // Controller function to get a single thought by ID
  createThought,     // Controller function to create a new thought
  updateThought,     // Controller function to update a thought by ID
  deleteThought,     // Controller function to delete a thought by ID
  addReaction,       // Controller function to add a reaction to a thought
  removeReaction     // Controller function to remove a reaction from a thought
} = require('../../controllers/thoughtControllers');

// Define routes for handling requests to '/thoughts'
// GET request to retrieve all thoughts
// POST request to create a new thought
router.route('/')
  .get(getAllThoughts)
  .post(createThought);

// Define routes for handling requests to '/thoughts/:thoughtId'
// GET request to retrieve a single thought by ID
// PUT request to update a thought by ID
// DELETE request to delete a thought by ID
router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Define routes for handling reactions within a specific thought
// POST request to add a reaction to a thought
router.route('/:thoughtId/reactions')
  .post(addReaction);

// DELETE request to remove a reaction from a thought by reaction ID
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

// Export the router to be used in the main application file
module.exports = router;

