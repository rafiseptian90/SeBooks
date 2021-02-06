// if is code in development
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

// setup express
const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts');
const router = require('./router/route')

// setup mongodb
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => {
    console.log(error)
})

// setup template rendering
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/master')
app.use(expressLayout)

// setup public path
app.use(express.static('public'))

// setup router
app.use('/', router)
// set express serve
app.listen(process.env.PORT || 3000)