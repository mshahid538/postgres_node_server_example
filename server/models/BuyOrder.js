const mongoose = require('mongoose');
const buyOrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    maxBidPrice: {
        type: Number,
        required: true
    },
    dataPackageType: {
        type: String,
        required: true
    },  
});

module.exports = mongoose.model('BuyOrder', buyOrderSchema);