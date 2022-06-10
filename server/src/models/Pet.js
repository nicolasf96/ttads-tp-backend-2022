import Mongoose from 'mongoose'
const {Schema, model} = Mongoose

let petSchema = new Schema({
    name: String,
    specie: String,
    breed: String,
    owner: {type: Schema.Types.ObjectId, ref: 'Client'},
});

let Pet = model('Pet',petSchema);

export default Pet;