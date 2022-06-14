import Mongoose from 'mongoose'

 const dbconnection =  Mongoose.connect("mongodb://localhost/ttads-tp-backend-2022", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then(db => console.log('Db is connected'))
        .catch(err => console.log('Error '))




export default dbconnection;