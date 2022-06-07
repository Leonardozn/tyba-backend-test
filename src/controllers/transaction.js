const Transaction = require('../models/transaction')
const utils = require('../controllers/utils')

function list(req, res, next) {
    let query = {}
    if (Object.keys(req.query).length) query = utils.buildJsonQuery(req.query, 'find')

    Transaction.find(query)
    .then(transaction_list => res.status(200).send({ data: transaction_list }))
    .catch(err => next(err))
}

module.exports = {
    list
}