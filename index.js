require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const getEmployees = require('./routes/getEmployees')
const createEmployee = require('./routes/createEmployee')
const updateEmployee = require('./routes/updateEmployee')
const deleteEmployee = require('./routes/deleteEmployee')
const getEmployeeById = require('./routes/getEmployeeById')
const searchEmployee = require('./routes/searchEmployee')
const jobwisedata = require('./routes/jobwisedata')
const averageSalary = require('./routes/averageSalary')
const ageDistribution = require('./routes/ageDistribution')
const cors = require("cors");

app.use(cors());

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
app.use(express.json())

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});



app.use('/employee', getEmployees)
app.use('/employee', createEmployee)
app.use('/employee', updateEmployee)
app.use('/employee', deleteEmployee)
app.use('/searchemployee', searchEmployee)
app.use('/employee', getEmployeeById)
app.use('/employee',jobwisedata)
app.use('/employee',averageSalary)
app.use('/employee',ageDistribution)




app.listen(3100, ()=>console.log('server started in port 3100'))