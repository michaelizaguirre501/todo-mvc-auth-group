const mongoose = require('mongoose')//imports mongoose
// defines how todo data is structured in DB 
const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  microsoftId: {
    type: String,
    required: true
  }
})

// Exporting 
module.exports = mongoose.model('Todo', TodoSchema)
