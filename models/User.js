const mongoose = require('mongoose');

// Define the Thought schema (assuming you have a Thought model)
const thoughtSchema = new mongoose.Schema({
  // Your Thought schema fields here
});

// Define the Thought model
const Thought = mongoose.model('Thought', thoughtSchema);

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Ensure virtual fields are serialised
userSchema.set('toJSON', {
  virtuals: true
});
userSchema.set('toObject', {
  virtuals: true
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
