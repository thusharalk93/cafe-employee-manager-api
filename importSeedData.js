require('dotenv').config();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Cafe = require('./models/Cafe');
const Employee = require('./models/Employee');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const importSeedData = async () => {
  try {
    // Seed data for cafes
    const cafes = [
      {
        name: 'Cafe A',
        description: 'A cozy cafe',
        logo: 'logo-url-1',
        location: 'Location A',
      },
      {
        name: 'Cafe B',
        description: 'A vibrant cafe',
        logo: 'logo-url-2',
        location: 'Location B',
      },
    ];

    // Seed data for employees
    const employees = [
      {
        name: 'John Doe',
        email_address: 'john@example.com',
        phone_number: '98765432',
        gender: 'Male',
        cafes: [
          {
            cafeId: cafes[0]._id,
            name: cafes[0].name,
            start_date: '2023-08-01T00:00:00Z',
          },
        ],
      },
      {
        name: 'Jane Smith',
        email_address: 'jane@example.com',
        phone_number: '87654321',
        gender: 'Female',
        cafes: [
          {
            cafeId: cafes[0]._id,
            name: cafes[0].name,
            start_date: '2023-08-05T00:00:00Z',
          },
          {
            cafeId: cafes[1]._id,
            name: cafes[1].name,
            start_date: '2023-08-10T00:00:00Z',
          },
        ],
      },
    ];

    await Cafe.deleteMany({});
    await Employee.deleteMany({});

    for (const cafe of cafes) {
      const newCafe = await Cafe.create(cafe);
      console.log(`Created cafe: ${newCafe.name}`);
    }

    for (const employee of employees) {
      const newEmployee = await Employee.create(employee);
      console.log(`Created employee: ${newEmployee.name}`);
    }

    console.log('Seed data imported successfully');
  } catch (error) {
    console.error('Error importing seed data:', error);
  } finally {
    mongoose.disconnect();
  }
};

importSeedData();
