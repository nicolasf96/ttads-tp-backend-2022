import Mongoose from 'mongoose';
const {Schema,model} =Mongoose;

let productSchema = new Schema({
    title: String,
    description: String,
    price: Number
    
},{
    timestamps: true,
    versionKey: false
});

let Product = model('Product', productSchema);

export default Product = Product;