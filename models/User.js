// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for a User
const userSchema = new mongoose.Schema({
  // Username of the user, must be unique and trimmed of whitespace
  username: {
    type: String,
    required: true, // The username field is required
    unique: true, // Each username must be unique
    trim: true, // Remove any leading or trailing whitespace
  },
  
  // Email of the user, must be unique and match a valid email format
  email: {
    type: String,
    required: true, // The email field is required
    unique: true, // Each email must be unique
    match: [
      // Regular expression to validate the email format
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address' // Error message if email format is invalid
    ],
  },
  
  // Array of ObjectIds referring to the Thought model
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference to another document's ObjectId
      ref: 'Thought' // The referenced model is Thought
    }
  ],
  
  // Array of ObjectIds referring to other User documents (friends)
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference to another document's ObjectId
      ref: 'User' // The referenced model is User
    }
  ]
}, {
  toJSON: {
    virtuals: true, // Include virtuals in the JSON output of the document
    getters: true, // Apply getters to the JSON output
  }
});

// Define a virtual field `friendCount` to get the number of friends the user has
userSchema.virtual('friendCount').get(function () {
  return this.friends.length; // Return the length of the friends array
});

// Create the User model based on the defined schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;

