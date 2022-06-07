const authController = require('../controllers/auth')

function authRouter(router) {
    router.post('/auth/login', authController.login)
    router.get('/auth/refresh', authController.refresh)

    return router
}

module.exports = authRouter