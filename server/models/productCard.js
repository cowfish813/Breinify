import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductCardSchema = Schema({
    productName: {
        type: String,
    },
    description: {
        type: String,
    },
    productImg: {
        type: String,
        
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
}, {timestamps: true});

const ProductCard = mongoose.model('ProductCard', ProductCardSchema);

export default ProductCard;