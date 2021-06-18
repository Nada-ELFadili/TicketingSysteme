//Call environnement variables config file
require('dotenv').config({ path: './config/.env' })
//Connection string to the databse in separate file
const dbaccess = require('./config/dbaccess')

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const ticketRoutes = require('./routes/ticketRoutes')
const assignRoutes = require('./routes/assignRoutes')

//Execute function to connect the database
dbaccess()

const app = express()

//Select the PORT
const PORT = process.env.PORT || 5000

//Middlewares
app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

//Routes of users
app.use('/api/users/', userRoutes)

//Routes of users
app.use('/api/tickets/', ticketRoutes)

//Routes of assign
app.use('/api/assign/', assignRoutes)

//Start listening requests
app.listen(PORT, () => {
  console.log('App listening on ' + PORT)
})
