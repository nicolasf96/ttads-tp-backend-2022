import Express from 'express'
import Mongoose from 'mongoose'
import Cors from 'cors'
import Morgan from 'morgan'
import bodyParser from 'body-parser'
import path from 'path'
import upload from './middlewares/upload.js'
import dbconnection from './database.js';
import router from './routes/index.routes.js';


const app = Express();

     
// prebuild middlewares
app.use(Cors()) // Enable All CORS Requests
//app.use(Helmet()) // For securing http request headers (later on)
app.use(Morgan('tiny')) // request logger
app.use(Express.json()) // JSON parsing (body-parser replacement)
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.set("view engine", "ejs");


app.use('/api', router);
app.use('/api/uploads', Express.static(path.resolve('uploads')))




const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))