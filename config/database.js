
// importing mongoose
const mongoose = require('mongoose')

//connecting to your database utilizing mongoose
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1) // Closes program on error.
  }
}

module.exports = connectDB // exports this whole object
