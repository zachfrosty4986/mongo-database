const router = require('express').Router();
const {
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// Define routes for reactions within a specific thought
router.route('/:reactionId')
  .post(addReaction)     // Add a reaction to a thought
  .delete(removeReaction); // Remove a reaction from a thought

module.exports = router;
