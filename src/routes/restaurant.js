const restaurantCtrl = require('../controllers/restaurant')

function restaurantRouter(router) {
    router.get('/restaurant/list', restaurantCtrl.list)

    return router
}

module.exports = restaurantRouter