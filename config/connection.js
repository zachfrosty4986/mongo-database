// Import 'connect' and 'connection' methods from the 'mongoose' library
const { connect, connection } = require('mongoose');

// Define the connection string for the MongoDB database
// This specifies the local MongoDB server and the database to connect to
const connectionString = 'mongodb://127.0.0.1:27017/friendListDB';

// Establish a connection to the MongoDB database using the connection string
// 'connect' will return a promise that resolves when the connection is successful
connect(connectionString);

// Export the 'connection' object from mongoose
// This allows other modules to use the established database connection
module.exports = connection;

