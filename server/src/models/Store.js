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
    idUser: String
    
},{
    timestamps: true,
    versionKey: false
});

let Store = model('Store', storeSchema);

export default Store = Store;