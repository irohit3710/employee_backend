// const express = require('express')
// const router = express.Router()
// let Employees = require('../schemas/Employees')

// router.get('/:search', async (req, res) => {
//     console.log(req.params.search)
//     try {
//         const employee = await Employees.find({"firstname": req.params.search})
//         if (!employee) {
//             return res.status(404).send('Employee not found');
//         }
//         res.json(employee);
//     }
//     catch (err) {
//         console.error(err);
//         res.status(500).send(`Error updating employee: ${err.message}`);
//     }

// })
// module.exports = router;

const express = require('express');
const router = express.Router();
let Employees = require('../schemas/Employees');

router.get('/:search', async (req, res) => {
  const searchPattern = new RegExp(req.params.search, 'i'); // 'i' for case-insensitive

  try {
    const employee = await Employees.find({
      $or: [
        { "firstname": { $regex: searchPattern }, },
        { "email": { $regex: searchPattern } },
      ]
    });

    if (!employee || employee.length === 0) {
      return res.status(404).send('Employee not found');
    }

    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error searching for employee: ${err.message}`);
  }
});

module.exports = router;
