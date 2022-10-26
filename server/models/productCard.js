const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductCardSchema = Schema({
    productName: {
        type: String,
    },
    description: {
        type: String,
    },
    productImg: {
        type: String
    }
}, {timestamps: true});

module.exports = ProductCard = mongoose.model('ProductCard', ProductCardSchema);