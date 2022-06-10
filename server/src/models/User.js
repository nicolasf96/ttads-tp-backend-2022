import Mongoose from 'mongoose';
const {Schema,model} =Mongoose;

let userSchema = new Schema({
    email: String,
    username:String,
    password: String,
    firstName: String,
    lastName: String,
    phone: String
    
},{
    timestamps: true,
    versionKey: false
});

let User = model('User',userSchema);

export default User = User;