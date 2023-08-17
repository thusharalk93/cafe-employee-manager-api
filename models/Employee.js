const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const employeeSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => 'UI' + uuidv4().replace(/-/g, '').slice(2, 9), // Generate UUID with custom format
  },
  name: String,
  email_address: String,
  phone_number: String,
  gender: String,
  cafes: [
    {
      cafeId: { type: String, ref: 'Cafes' },
      name: { type: String, ref: 'Cafes' },
      start_date: Date,
    },
  ],
});

module.exports = mongoose.model('Employee', employeeSchema);
