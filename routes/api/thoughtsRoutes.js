const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtControllers');

// Define routes for the Thought model
router.route('/')
  .get(getAllThoughts)
  .post(createThought);

router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

  // Define routes for reactions within a specific thought
router.route('/:thoughtId/reactions')
.post(addReaction)     // Add a reaction to a thought
router.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction); // Remove a reaction from a thought

module.exports = router;
