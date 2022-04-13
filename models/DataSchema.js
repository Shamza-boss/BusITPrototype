const mongoose = require('mongoose');



const ProductSchema =  new mongoose.Schema({
    ProductName: {
        type: String,
        required: true
    },
    ProductPhase: {
        type: String,
        enum: {
            values: ['Manufacturing', 'Testing', 'Storage', 'Sold'],
            message: '{VALUE} is not supported'},
        default: 'Manufacturing',
        required: true
    },
    Date: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('ProductDB', ProductSchema);