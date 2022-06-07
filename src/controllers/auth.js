const User = require('../models/user')
const utils = require('./utils')
const config = require('../config/app')
const jwt = require('jsonwebtoken')

function login(req, res, next) {
    User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] })
    .then(user => {
        if(!user) throw new utils.apiError(400, 'This user is not registered')
        
        utils.verifyPwd(req.body.password, user.password)
        .then(match => {
            if (match) {
                const payload = {
                    username: user.username,
                    email: user.email,
                    role: user.view.role.name,
                    id: user._id
                }
                
                jwt.sign(payload, config.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }, async (err, token) => {
                    if (err) throw new utils.apiError(500, err.message)

                    jwt.sign(payload, config.REFRESH_TOKEN_SECRET, { expiresIn: '16h' }, (refErr, refreshToken) => {
                        if (refErr) throw new utils.apiError(500, refErr.message)

                        res.status(200).send({ token: token, refreshToken: refreshToken })
                    })
                })
            } else {
                throw new utils.apiError(400, 'Wrong password')
            }
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
}

function refresh(req, res, next) {
    if (req.headers.authorization) {
        const refreshToken = req.headers.authorization.split(' ')[1]

        jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET, (err, decode) => {
            if (err) {
                new utils.apiError(401, 'Invalid token')
            } else {
                User.findOne({ email: decode.email })
                .then(user => {
                    const payload = {
                        username: user.username,
                        email: user.email,
                        role: user.view.role.name,
                        id: user._id
                    }
                    
                    jwt.sign(payload, config.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }, (tokenErr, token) => {
                        if (tokenErr) throw new utils.apiError(500, tokenErr.message)
                        
                        res.status(200).send({ token: token })
                    })
                })
                .catch(err => next(err))
            }
        })
    }
}

module.exports = {
    login,
    refresh
}