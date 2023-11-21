import Mongoose from 'mongoose'

 const dbconnection =  Mongoose.connect("mongodb://127.0.0.1:27017/ttads-tp-backend-2022", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then(db => console.log('Db is connected'))
        .catch(err => console.log(err))




export default dbconnection;