const express = require('express')//import express
const app = express()             //assign express as app
const mongoose = require('mongoose')//import mongoose 
const passport = require('passport')//import passport - lets us use MicroStrategy 
const session = require('express-session')//
const MongoStore = require('connect-mongo')(session)//logout prevention and mongo sessions
const connectDB = require('./config/database')//import our db file that holds our mongoose
const authRoutes = require('./routes/auth')//
const homeRoutes = require('./routes/home')//bring in exported data from routes files
const todoRoutes = require('./routes/todos')//bring in all our todo methods

require('dotenv').config({path: './config/.env'})//brings in values from our .env file

// Passport config/Magic
require('./config/passport')(passport)

//connecting to our database
connectDB()


app.set('view engine', 'ejs')//load static file and use ejs as templating language 

//This lets us connect to files in our public folder
app.use(express.static('public'))

// It parses incoming requests
app.use(express.urlencoded({ extended: true }))
// Set our express to use json
app.use(express.json())

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Handles Routes  
app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)
 
 //tells express to listen on port set in our env file and logs when its running
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    