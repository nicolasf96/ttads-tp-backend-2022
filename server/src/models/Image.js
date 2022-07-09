import Mongoose from 'mongoose';
const {Schema,model} =Mongoose;

let imageSchema = new Schema({
	img:
	{
		data: Buffer,
		contentType: String
	},
    idUser: {type: Schema.Types.ObjectId, ref: 'User'}
},{
    timestamps: true,
    versionKey: false
});

let Image = model('Image',imageSchema);

export default Image = Image;
