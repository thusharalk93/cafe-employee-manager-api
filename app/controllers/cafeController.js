const Employee = require('../../models/Employee');
const Cafe = require('../../models/Cafe');

exports.createCafe = async (req, res) => {
  try {
    const { name, description, logo, location } = req.body;

    const cafe = await Cafe.create({
      name,
      description,
      logo,
      location,
    });

    res.status(201).json(cafe);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.getCafes = async (req, res) => {
    try {
      const { location } = req.query;
      let query = {};
  
      if (location) {
        query = { location };
      }
  
      const cafes = await Cafe.find(query)
        .select('_id name description logo location')
        .populate({
          path: 'employees.cafeId',
          select: 'name',
        })
        .lean();
  
      cafes.forEach((cafe) => {
        cafe.employees = cafe.employees.length; // Calculate number of employees
      });
  
      cafes.sort((a, b) => b.employees - a.employees); // Sort by highest number of employees first
  
      res.status(200).json(cafes);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
};

exports.updateCafe = async (req, res) => {
    try {
      const cafeId = req.params.id;
      const { name, description, logo, location } = req.body;
  
      const updatedCafe = await Cafe.findByIdAndUpdate(
        cafeId,
        {
          name,
          description,
          logo,
          location,
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedCafe) {
        return res.status(404).json({ error: 'Cafe not found' });
      }
  
      res.status(200).json(updatedCafe);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
};

exports.deleteCafe = async (req, res) => {
    try {
      const cafeId = req.params.id;
  
      
      // Find and delete the cafe
      const deletedCafe = await Cafe.findByIdAndDelete(cafeId);
  
      if (!deletedCafe) {
        return res.status(404).json({ error: 'Cafe not found' });
      }
  
      // Delete associated employees
      const employeeIds = deletedCafe.employees.map((employee) => employee.cafeId.toString());
      await Employee.deleteMany({ _id: { $in: employeeIds } });
  
      res.status(200).json({ message: 'Cafe and associated employees deleted' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
};