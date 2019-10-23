const Express = require('express');
const router = Express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.json({ msg: err });
    }
});
router.post('/', async (req, res) => {
    const order = new Order({
        product: req.product,
        price: req.price,
    });
    try {
        const savedOrder = await order.save();
        res.json(savedOrder);
    } catch (err) {
        res.json({msg: err})
    }
})
module.exports = router;