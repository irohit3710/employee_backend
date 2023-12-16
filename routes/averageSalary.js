const express = require('express')
const router = express.Router()
let Employees = require('../schemas/Employees')


router.get('/api/employees/average-salary-job-wise', async (req, res) => {
    try {
      const averageSalaryByJob = await Employees.aggregate([
        {
          $group: {
            _id: '$job',
            averageSalary: { $avg: { $convert: { input: '$salary', to: 'double', onError: 0, onNull: 0 } } },
          },
        },
        { $project: { job: '$_id', averageSalary: 1, _id: 0 } },
      ]);
  
      res.json(averageSalaryByJob);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching average salary job-wise.' });
    }
  });

module.exports = router