const User = require('../models/user')
const Role = require('../models/role')
const Transaction = require('../models/transaction')
const jwt = require('jsonwebtoken')
const config = require('../config/app')
const utils = require('../controllers/utils')

async function session(req, res, next) {
    if (req.path.indexOf('/auth/login') == -1 && req.path.indexOf('/auth/refresh') == -1) {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1]
            
            jwt.verify(token, config.ACCESS_TOKEN_SECRET, async (err, decode) => {
                if (err) return res.status(401).send({message: 'Invalid token'})
                
                const user = await User.findOne({ email: 'email@company.com' }).populate({ path: 'role', select: '-__v' })
                if (req.path.indexOf(user.view.role.permissions) > -1) {
                    try {
                        let transaction = await Transaction.findOne({ user: user._id })
    
                        if (transaction) {
                            const obj = { amount: transaction.amount + 1 }
                            Object.assign(transaction, obj)
                        } else {
                            transaction = new Transaction({ user: user._id, amount: 1 })
                        }
    
                        transaction.save()
                        next()
                    } catch (error) {
                        console.log(error)
                        return res.status(400).send({message: 'Something went wrong when storing the transaction'})
                    }
                } else {
                    return res.status(401).send({message: 'This user is not authorized to perform the operation'})
                }
            })
        } else {
            return res.status(401).send({message: 'Unauthorized user'})
        }
    } else {
        next()
    }
}

module.exports = session