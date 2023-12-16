const express = require('express')
const router = express.Router()
let Employees = require('../schemas/Employees')


router.get('/api/employees/job-wise-count', async (req, res) => {
    try {
      const jobWiseCount = await Employees.aggregate([
        { $group: { _id: '$job', count: { $sum: 1 } } },
        { $project: { job: '$_id', count: 1, _id: 0 } },
      ]);
  
      res.json(jobWiseCount);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching job-wise employee count.' });
    }
  });

  module.exports = router;