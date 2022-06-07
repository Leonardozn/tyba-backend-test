const mongoose = require('../modules/mongoConnection')
const Schema = mongoose.Schema
const utils = require('../controllers/utils')

const roleSchema = new Schema({
    name: { type: String },
    permissions: [String]
})

const Role = mongoose.model('Role', roleSchema)

module.exports = Role