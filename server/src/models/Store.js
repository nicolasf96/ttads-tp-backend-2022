import Mongoose from 'mongoose';
const {Schema,model} =Mongoose;


let storeSchema = new Schema({
    name: String,
    username: String,
    description: String,
    address:String,
    city: String,
    website: String,
    isService: Boolean,
    valoration: Number,
    telephone: Number,
    joined: {
        type: Date,
        default: Date.now
    },
    tags: [ String ],
    instagram:{type: String, default: null },
    twitter:{type: String, default: null },
    facebook:{type: String, default: null },
    category:{type: Schema.Types.ObjectId, ref: 'Category'},
    user:{type: Schema.Types.ObjectId, ref: 'User'},
    products:[{type: Schema.Types.ObjectId, ref: 'Product'}],
    reviews:[{type: Schema.Types.ObjectId, ref: 'Review'}],
    profilePicture: {type: Schema.Types.ObjectId, ref: 'Image'},
    banner: {type: Schema.Types.ObjectId, ref: 'Image'},
    images: [{type: Schema.Types.ObjectId, ref: 'Image'}]
    
},{
    timestamps: true,
    versionKey: false
});

storeSchema.pre('remove', async function() {
    try {
        const Product = Mongoose.model('Product')
        const Review = Mongoose.model('Review')
        const Image = Mongoose.model('Image')

        await Product.deleteMany({ store: this._id });
        await Review.deleteMany({ store: this._id });
        await Image.deleteMany({ idAssociated: this._id});
    } catch (error) {
        // Manejar errores
        console.error('Error al borrar dependencias:', error);
        next(error);
    }
});


let Store = model('Store', storeSchema);

export default Store;