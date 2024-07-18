const mongoose = require('mongoose');
const User = require('./path/to/userModel');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/your_database', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Create a new user
const createUser = async () => {
  try {
    const newUser = new User({
      username: 'johndoe',
      email: 'john@example.com',
    });

    const savedUser = await newUser.save();
    console.log('User created:', savedUser);
  } catch (err) {
    console.error(err);
  }
};

// Retrieve a user and include the friendCount virtual
const getUserWithFriendCount = async (userId) => {
  try {
    const user = await User.findById(userId);
    console.log('User with friend count:', user.toJSON());
  } catch (err) {
    console.error(err);
  }
};

createUser();