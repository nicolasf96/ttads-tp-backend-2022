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
    store:{type: Schema.Types.ObjectId, ref: 'Store'},
    profilePicture: {type: Schema.Types.ObjectId, ref: 'Image'},
    role: {
        type: String,
        enum: ['user', 'moderator'], 
        default: 'user' 
    }
    
},{
    timestamps: true,
    versionKey: false
});


userSchema.pre('remove', async function() {
    try {
        const Store = Mongoose.model('Store')
        const Image = Mongoose.model('Image')

        await Store.deleteOne({ user: this._id });
        await Image.deleteMany({ idAssociated: this._id});
    } catch (error) {
        // Manejar errores
        console.error('Error al borrar dependencias:', error);
        next(error);
    }
});



let User = model('User',userSchema);

export default User = User;