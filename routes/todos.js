const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') //brings in the get method from controller
const { ensureAuth, ensureGuest } = require('../middleware/auth')//brings in ensure auth from middleware 

router.get('/', ensureAuth, todosController.getTodos)// when the root (/) route is called, use the get todos method 

router.post('/createTodo', todosController.createTodo)// 


router.put('/markComplete', todosController.markComplete)// once the user clicks on an li in our ejs. it will trigguer our markComplete function in todosController to update our MongoDB from completed: false to true

router.put('/markIncomplete', todosController.markIncomplete) // when the mark incomplete route is called and is passed the request data it triggers our marked incomplete method to update the database

router.delete('/deleteTodo', todosController.deleteTodo)//when delete todo is called upon run delete todo 

module.exports = router