const { URI } = require('../botconfig.json')
const mongoose = require('mongoose')

const connectDB = async() => {
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('Connected to the database')
}

module.exports = connectDB
    