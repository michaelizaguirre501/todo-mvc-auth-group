
// importing the schema for our database
const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            //Do we want to grab all the todos?
            const todoItems = await Todo.find({microsoftId: req.user.microsoftId})
            //How can we grab our logged in users left to dos?
            const itemsLeft = await Todo.countDocuments({microsoftId: req.user.microsoftId, completed: false}) //allows us to look at MongoDB for a specific user and confirm amount of tasks left
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user}) //renders the results to our ejs
        }catch(err){
            console.log(err)
        }
    },
    //Creates todos
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, microsoftId: req.user.microsoftId}) // creates a new todo using the schema that was created in our model
            console.log('Todo has been added!')
            res.redirect('/todos') // Redirecting to our todo routes
        }catch(err){
            console.log(err)
        }
    },
    //Marks Todos completed
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{//finds the todo with the todo id from js file and marking as complete
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    //Marks todos incomplete
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    //Deletes Todos
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    