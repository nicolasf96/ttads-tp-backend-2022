import Mongoose from 'mongoose';
const {Schema,model} =Mongoose;

let storeSchema = new Schema({
    name: String,
    username: String,
    description: String,
    address:String,
    city: String,
    isService: Boolean,
    valoration: Number,
    idCategory: String,
    user:{type: Schema.Types.ObjectId, ref: 'User'},
    products:[{type: Schema.Types.ObjectId, ref: 'Product'}]
    
},{
    timestamps: true,
    versionKey: false
});

let Store = model('Store', storeSchema);

export default Store = Store;