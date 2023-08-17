const mongoose = require('mongoose');

require('dotenv').config();

const connectDatabase = async () => {
  try {
    const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/company-db';
    await mongoose.connect(dbURI, {});    
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDatabase;