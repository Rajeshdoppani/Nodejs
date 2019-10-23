const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    product: String,
    price: Number
});

module.exports = mongoose.model('Order', OrderSchema);