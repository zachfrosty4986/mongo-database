const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Reaction schema
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleString(),
  }
}, {
  toJSON: {
    getters: true,
  },
  toObject: {
    getters: true,
  }
});

module.exports = reactionSchema;

