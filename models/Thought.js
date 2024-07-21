const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const reactionSchema = require("./Reaction")

// Define the Thought schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema]
}, {
  toJSON: {
    virtuals: true,
    getters: true,
  },
});

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Create the Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

