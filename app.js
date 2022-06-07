const dotenv = require('dotenv')
dotenv.config()
const getRouter = require('./src/routes/routes')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const utils = require('./src/controllers/utils')
const session = require('./src/middleware/session')

app.use(cors())

app.use(morgan('dev'))

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use('/', session, getRouter(), utils.closeConnection)

//Not found error
app.use((req, res, next) => {
    const err = new Error('Not found')
    err.status = 404
    next(err)
})

//Handler error
app.use((err, req, res, next) => {
    const error = utils.errorMessage(err)
    res.status(error.status).send({ status: error.status, message: error.message })
})

module.exports = app
    