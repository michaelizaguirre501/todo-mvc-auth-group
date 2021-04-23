const mongoose = require('mongoose') // imports mongoose here
//define how user data is structured 
const UserSchema = new mongoose.Schema({
  microsoftId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('User', UserSchema)
