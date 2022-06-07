const transactionCtrl = require('../controllers/transaction')

function transactionRouter(router) {
    router.get('/transaction/list', transactionCtrl.list)

    return router
}

module.exports = transactionRouter