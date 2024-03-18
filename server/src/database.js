import Mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


const database_url = process.env.DATABASE_URL
 const dbconnection = await Mongoose.connect(process.env.DATABASE_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then(db => console.log('Db is connected - ', db.connection.name))
        .catch(err => console.log(err))




export default dbconnection;