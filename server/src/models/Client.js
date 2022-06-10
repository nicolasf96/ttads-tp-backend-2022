import Mongoose from 'mongoose';
import router from "../routes/api/v1/client.js";
const {Schema,model} =Mongoose;

let clientSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    address:String,
    pets:[{type: Schema.Types.ObjectId, ref: 'Pet'}],
});

let Client= model('Client',clientSchema);

export default Client;