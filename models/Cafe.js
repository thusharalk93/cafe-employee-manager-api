const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const cafeSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4, // Generate UUID for cafe ID
  },
  name: String,
  description: String,
  logo: String,
  location: String,
  employees: [
    {
      cafeId: { type: String, ref: 'Employee' },
      name: { type: String, ref: 'Employee' },
      start_date: Date,
    },
  ],
});

module.exports = mongoose.model('Cafes', cafeSchema);
