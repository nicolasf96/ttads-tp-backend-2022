import Express from 'express'
import Mongoose from 'mongoose'
import Cors from 'cors'
import Morgan from 'morgan'
//import Helmet from 'helmet'
//import RateLimit from 'express-rate-limit'

import dbconnection from './database.js';

import routerUser from './routes/user.routes.js'
import routerCategory from './routes/categories.routes.js'
import routerStore from './routes/stores.routes.js'
import routerReview from './routes/reviews.routes.js'
import routerProduct from './routes/products.routes.js'

const app = Express();

     
// prebuild middlewares
app.use(Cors()) // Enable All CORS Requests
//app.use(Helmet()) // For securing http request headers (later on)
app.use(Morgan('tiny')) // request logger
app.use(Express.json()) // JSON parsing (body-parser replacement)


app.use('/api/users', routerUser);
app.use('/api/categories', routerCategory);
app.use('/api/stores', routerStore);
app.use('/api/reviews', routerReview);
app.use('/api', routerProduct);


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))