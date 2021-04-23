const express = require('express') // imports express
const router = express.Router()   //  Assign Router method from express to router.
const homeController = require('../controllers/home') // Bringing in controllers home.js

router.get('/', homeController.getIndex) // sets root page to the rendering of our index.ejs 

module.exports = router