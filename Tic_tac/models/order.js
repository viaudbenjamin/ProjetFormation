const mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    total:Number,
    train:[{type:mongoose.Schema.Types.ObjectId, ref:'journey'}],
    userId:String

})

var orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel