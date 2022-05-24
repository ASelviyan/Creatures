const express = require('express')
const ejsLayouts = require("express-ejs-layouts")
const methodOverride = require('method-override')

const app = express()

app.set('view engine', 'ejs')

app.use(ejsLayouts)
//body parser middleware
//makes sure the data that comes in is a string or array
app.use(express.urlencoded({extended: false}))

app.use(methodOverride("_method"))
//controllers
app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/creatures', require('./controllers/creatures'))

//Home
app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.listen(7000, () => {
    console.log(`LISTENING TO 7000`)
})