// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Destructure Schema from mongoose for easier use
const { Schema } = mongoose;

// Define the schema for a Reaction, which will be used in the Thought model
const reactionSchema = new Schema({
  // Unique identifier for the reaction, automatically generated
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(), // Generate a new ObjectId if not provided
  },
  
  // The body/content of the reaction, with a maximum length of 280 characters
  reactionBody: {
    type: String,
    required: true, // Reaction body is required
    maxlength: 280, // Maximum length of 280 characters
  },
  
  // Username of the person who made the reaction
  username: {
    type: String,
    required: true, // Username is required
  },
  
  // Timestamp of when the reaction was created, with a default value of the current date and time
  createdAt: {
    type: Date,
    default: Date.now, // Set default to current date and time
    get: timestamp => new Date(timestamp).toLocaleString(), // Format the timestamp for easier readability
  }
}, {
  toJSON: {
    getters: true, // Apply the `get` function to `createdAt` when converting to JSON
  },
});

// Export the reaction schema for use in other parts of the application
module.exports = reactionSchema;

