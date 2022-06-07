const mongoose = require('../modules/mongoConnection')
const Schema = mongoose.Schema
const utils = require('../controllers/utils')

const transactionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number }
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction