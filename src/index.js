const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
require('../db/connection')
app.use(express.json())

const mainRoutes = require('../routes/mainRoutes')
const adminRoutes = require('../routes/adminRouts')

app.use(cors())

app.use(express.urlencoded({extended:true}))

app.use(mainRoutes)
app.use('/admin',adminRoutes)

module.exports = app