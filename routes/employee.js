const Express = require('express');
const router = Express.Router();
const Employee = require('../models/Employee');

//GET Method
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.json({ msg: err })
    }
});

// POST Method
router.post('/', async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        age: req.body.age,
        designation: req.body.designation
    });
    try {
        const savedEmp = await employee.save();
        res.json(savedEmp);
    } catch (err) {
        res.json({ msg: err })
    }
});

// Specific Employee
router.get('/:name', async (req, res) => {
    try {
        const specificEmp = await Employee.findOne({name : req.params.name});
        res.json(specificEmp);
    } catch (err) {
        res.json({ msg: err })
    }
});

//Update Employee
router.patch('/:empId', async (req, res) => {
    try {
        const updatedEmp = await Employee.updateOne({ _id: req.params.empId }, { $set: { name: req.body.name } });
        res.json(updatedEmp);
    } catch (err) {
        res.json({ msg: err })
    }
});

module.exports = router;