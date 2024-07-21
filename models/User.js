const mongoose = require('mongoose');

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
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
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
},{
  toJSON: {
    virtuals: true,
    getters: true,
  }
});

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
