const express = require('express');
const connectDatabase = require('../config/database');
const employeeRoutes = require('./routes/employeeRoutes');
const cafeRoutes = require('./routes/cafeRoutes');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Database connection
connectDatabase();

app.use(express.json());

// Use employee and cafe routes
app.use('/employees', employeeRoutes);
app.use('/cafes', cafeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
