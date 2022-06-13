import Express from 'express'
import Mongoose from 'mongoose'
import Cors from 'cors'
import Morgan from 'morgan'
//import Helmet from 'helmet'
//import RateLimit from 'express-rate-limit'
import routerUser from './routes/user.routes.js'
import routerCategory from './routes/categories.routes.js'
import routerStore from './routes/stores.routes.js'

const app = Express();
// connect to db
Mongoose.connect("mongodb://localhost/ttads-tp-backend-2022", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(db => console.log('Db is connected'))
  .catch(err => console.log('Error '));


     
// prebuild middlewares
app.use(Cors()) // Enable All CORS Requests
//app.use(Helmet()) // For securing http request headers (later on)
app.use(Morgan('tiny')) // request logger
app.use(Express.json()) // JSON parsing (body-parser replacement)


app.use('/api/users', routerUser);
app.use('/api/categories', routerCategory);
app.use('/api/stores', routerStore);


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))