import Mongoose from 'mongoose';
const {Schema,model} =Mongoose;

let storeSchema = new Schema({
    name: String,
    username: String,
    description: String,
    profilePicture: String,
    address:String,
    city: String,
    isService: Boolean,
    valoration: Number,
    category:{type: Schema.Types.ObjectId, ref: 'Category'},
    user:{type: Schema.Types.ObjectId, ref: 'User'},
    products:[{type: Schema.Types.ObjectId, ref: 'Product'}],
    reviews:[{type: Schema.Types.ObjectId, ref: 'Review'}]
    
},{
    timestamps: true,
    versionKey: false
});

let Store = model('Store', storeSchema);

export default Store = Store;