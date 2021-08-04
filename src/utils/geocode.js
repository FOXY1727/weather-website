const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXBrZXZvbCIsImEiOiJja3Jsd3FuZXMxZ3pjMnBwdml5NmFiMXFxIn0.2Zmf6gF24LA7lAnEHVKDlQ'

    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback('Uanble to connect to location services.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another location', undefined)
        } else {
            const data = {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                place: body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode