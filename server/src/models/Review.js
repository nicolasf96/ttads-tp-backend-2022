import Mongoose from 'mongoose';
const {Schema,model} =Mongoose;

let reviewSchema = new Schema({
    idStore: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'}
    
},{
    timestamps: true,
    versionKey: false
});

let Review = model('Review', reviewSchema);

export default Review = Review;