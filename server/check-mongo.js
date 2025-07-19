const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// MongoDB connection string
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resume-portfolio';

console.log('Attempting to connect to MongoDB at:', mongoURI);

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ MongoDB connection successful!');
    
    // List all collections
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error('Error listing collections:', err);
        return;
      }
      
      console.log('Available collections:');
      collections.forEach(collection => {
        console.log(`- ${collection.name}`);
      });
      
      // Close the connection
      mongoose.connection.close();
      console.log('Connection closed.');
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    console.log('\nPossible solutions:');
    console.log('1. Make sure MongoDB is running on your system');
    console.log('2. Check if the MongoDB URI in .env file is correct');
    console.log('3. Try using 127.0.0.1 instead of localhost in the URI');
    console.log('4. Check if MongoDB is listening on the default port 27017');
    
    process.exit(1);
  });