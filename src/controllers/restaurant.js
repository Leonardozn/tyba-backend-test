const axios = require('axios').default

function list(req, res, next) {
    let url = 'https://foodbukka.herokuapp.com/api/v1/restaurant'
    if (req.query.location) url += `?location=${req.query.location}`

    const options = {
        method: 'GET',
        url: url,
        headers: {}
    }

    axios.request(options)
    .then(response => res.status(200).send({ data: response.data }))
    .catch(error => next(error))
}

module.exports = {
    list
}