const mongoose = require('mongoose')
const config = require('../config/app')
const credentials = `mongodb://${config.MONGO_HOST}:${config.MONGO_PORT}/${config.MONGO_DATABASE}`
const options = {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}

mongoose.connect(credentials, options, (err) => {
    if (err) return console.log(`Mongodb connection ${err}`)
})

module.exports = mongoose
    