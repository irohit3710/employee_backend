const express = require('express')
const router = express.Router()
let Employees = require('../schemas/Employees')

router.get('/api/employees/age-distribution', async (req, res) => {
    try {
        //   const ageDistribution = await Employees.find().select('age');
        //   res.json(ageDistribution.map(employee => employee.age));
        const ageStatistics = await Employees.aggregate([
            {
                $group: {
                    _id: '$job',
                    maxAge: { $max: '$age' },
                    minAge: { $min: '$age' },
                },
            },
        ]);

        res.json(ageStatistics);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching age distribution.' });
    }
});

module.exports = router