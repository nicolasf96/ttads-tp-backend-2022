import Mongoose from 'mongoose';
const {Schema,model} =Mongoose;

let userSchema = new Schema({
    email: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    firstName: String,
    lastName: String,
    phone: String,
    stores:[{type: Schema.Types.ObjectId, ref: 'Store'}],
    profilePicture: {type: Schema.Types.ObjectId, ref: 'Image'}
    
},{
    timestamps: true,
    versionKey: false
});

let User = model('User',userSchema);

export default User = User;