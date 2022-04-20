const express = require('express')
const cors = require('cors')


const app = express()
app.use(cors());
app.use(express.json())


/*
app.use('/api/users',require('./routes/users.routes.js'))
app.use('/api/cathegories',require('./routes/cathegories.routes.js'))
*/

app.set('port', process.env.PORT || 3000)

module.exports = app;