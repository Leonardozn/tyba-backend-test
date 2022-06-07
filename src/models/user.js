const mongoose = require('../modules/mongoConnection')
const Schema = mongoose.Schema
const utils = require('../controllers/utils')

const userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String, unique: true },
	role: { type: Schema.Types.ObjectId, ref: 'Role' }
})

userSchema.virtual('view').get(function() {
    const ticket = {
        _id: this._id,
        username: this.username,
		email: this.email,
        role: this.role
    }
    return ticket
})

const User = mongoose.model('User', userSchema)

module.exports = User