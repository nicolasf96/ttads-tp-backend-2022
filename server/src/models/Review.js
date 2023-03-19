import Mongoose from 'mongoose';
const {Schema,model} =Mongoose;

let reviewSchema = new Schema({
    store: {type: Schema.Types.ObjectId, ref: 'Store', required: true},
    comment: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
    
},{
    timestamps: true,
    versionKey: false
});

let Review = model('Review', reviewSchema);

export default Review = Review;