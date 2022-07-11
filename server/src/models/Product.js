import Mongoose from 'mongoose';
const {Schema,model} =Mongoose;

let productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    idStore: {type: Schema.Types.ObjectId, ref: 'Store'},
    image: {type: Schema.Types.ObjectId, ref: 'Image'}
},{
    timestamps: true,
    versionKey: false
});

let Product = model('Product', productSchema);

export default Product = Product;