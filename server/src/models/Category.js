import Mongoose from 'mongoose';
const {Schema,model} =Mongoose;

let categorySchema = new Schema({
    description: String,
    idCategoryParent: {type: Schema.Types.ObjectId, ref: 'Category'},
    icon: String
},{
    timestamps: true,
    versionKey: false
});

let Category = model('Category',categorySchema);

export default Category = Category;