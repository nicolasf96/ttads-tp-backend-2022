import Mongoose from 'mongoose';
const {Schema,model} =Mongoose;

let productSchema = new Schema({
    title: String,
    description: String,
    location: String,
    used: { type: Boolean, default: false },
    views:{ type: Number, default: 0 },
    price: Number,
    type: String,
    unitOM: String,
    idStore: {type: Schema.Types.ObjectId, ref: 'Store'},
    images: [{type: Schema.Types.ObjectId, ref: 'Image'}]
},{
    timestamps: true,
    versionKey: false
});

let Product = model('Product', productSchema);

export default Product = Product;