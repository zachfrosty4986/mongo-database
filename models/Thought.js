// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Destructure Schema and model from mongoose for easier use
const { Schema, model } = mongoose;

// Import the Reaction schema to be used in the Thought schema
const reactionSchema = require("./Reaction")

// Define the schema for a Thought
const thoughtSchema = new Schema({
  // Text content of the thought, with constraints on length
  thoughtText: {
    type: String,
    required: true, // The thought text is required
    minlength: 1, // Minimum length of 1 character
    maxlength: 280, // Maximum length of 280 characters
  },
  
  // Timestamp of when the thought was created, with a default value of the current date and time
  createdAt: {
    type: Date,
    default: Date.now, // Set default to the current date and time
    get: timestamp => new Date(timestamp).toLocaleString(), // Format the timestamp for easier readability
  },
  
  // Username of the person who created the thought
  username: {
    type: String,
    required: true, // Username is required
  },
  
  // Array of reactions associated with this thought, using the Reaction schema
  reactions: [reactionSchema]
}, {
  toJSON: {
    virtuals: true, // Include virtuals in the JSON representation of the document
    getters: true, // Apply the `get` function to `createdAt` when converting to JSON
  },
});

// Create a virtual field called `reactionCount` that calculates the number of reactions associated with the thought
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length; // Return the length of the reactions array
});

// Create the Thought model using the defined schema
const Thought = model('Thought', thoughtSchema);

// Export the Thought model for use in other parts of the application
module.exports = Thought;


