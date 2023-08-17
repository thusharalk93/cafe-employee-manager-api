const Employee = require('../../models/Employee');
const Cafe = require('../../models/Cafe');

exports.createEmployee = async (req, res) => {
  try {
    const { name, email_address, phone_number, gender, cafes } = req.body;

    const employee = await Employee.create({
      name,
      email_address,
      phone_number,
      gender,
      cafes,
    });

    // Update the cafe with employee relationship
    if (cafes && cafes.length > 0) {
      await Promise.all(
        cafes.map(async (cafe) => {
          const cafeData = await Cafe.findById(cafe.cafeId);
          if (cafeData) {
            cafeData.employees.push({ cafeId: employee._id, start_date: cafe.start_date });
            await cafeData.save();
          }
        })
      );
    }

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.getEmployees = async (req, res) => {
    try {
      const { cafe } = req.query;
      let query = {};
  
      if (cafe) {
        query = { 'cafes.name': cafe };
      }
  
      const employees = await Employee.find(query)
        .select('_id id name email_address phone_number cafes')
        .lean();
  
      employees.forEach((employee) => {
        employee.days_worked = calculateDaysWorked(employee);
        const cafeNames = employee.cafes.map(cafe => cafe.name);
        employee.cafe = cafeNames ? cafeNames : ''; // Cafe's name that the employee is under
        delete employee.cafes; // Remove the cafes array from the response
      });
  
      employees.sort((a, b) => b.days_worked - a.days_worked); // Sort by highest number of days worked first
  
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
};
  
const calculateDaysWorked = (employee) => {
    if (!employee.cafes || employee.cafes.length === 0) {
      return 0;
    }
    
    const currentDate = new Date();
    const startDate = employee.cafes[0].start_date;
    const timeDiff = Math.abs(currentDate - startDate);
    const daysWorked = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    
    return daysWorked;
};

exports.updateEmployee = async (req, res) => {
    try {
      const employeeId = req.params.id;
      const { name, email_address, phone_number, gender, cafes } = req.body;
  
      const updatedEmployee = await Employee.findByIdAndUpdate(
        employeeId,
        {
          name,
          email_address,
          phone_number,
          gender,
          cafes,
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      // Update the cafe relationships
      await Promise.all(
        updatedEmployee.cafes.map(async (cafe) => {
          const cafeData = await Cafe.findById(cafe.cafeId);
          if (cafeData) {
            const employeeIndex = cafeData.employees.findIndex(
              (employee) => employee.cafeId.toString() === updatedEmployee._id.toString()
            );
  
            if (employeeIndex !== -1) {
              cafeData.employees[employeeIndex].start_date = cafe.start_date;
              await cafeData.save();
            }
          }
        })
      );
  
      res.status(200).json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
      const employeeId = req.params.id;
  
      // Find and delete the employee
      const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
  
      if (!deletedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      res.status(200).json({ message: 'Employee deleted' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
};