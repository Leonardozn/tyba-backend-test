const express = require('express')
let router = express.Router()
const healthRouter = require('./health')
const restaurantRouter = require('./restaurant')
const authRouter = require('./auth')
const transactionRouter = require('./transaction')

function getRouter() {
    healthRouter(router)
    restaurantRouter(router)
    authRouter(router)
    transactionRouter(router)

    return router
}

module.exports = getRouter