const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomThoughts, getRandomName } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  
  // Delete the collections if they exist
  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  // Create empty arrays to hold the users and thoughts
  const users = [];
  const thoughts = [];

  // Loop to create user data
  for (let i = 0; i < 20; i++) {
    const userData = getRandomName();
    users.push(userData);
  }

  // Create users and get the user data
  const userData = await User.create(users);

  // Loop to create thought data, assigning thoughts to users
  for (let i = 0; i < 20; i++) {
    const thoughtData = getRandomThoughts(1);
    thoughts.push({
      ...thoughtData[0],
      username: users[Math.floor(Math.random() * users.length)].username, // Assign a random user to the thought
    });
  }

  // Add thoughts to the collection
  await Thought.create(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
