// Import the User model from the User.js file
const User = require('./User');

// Import the Thought model from the Thought.js file
const Thought = require('./Thought');

// Export both the User and Thought models as a single module
module.exports = { User, Thought };