'use strict';

const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f1afe3891b237b7af4dab4244144e49f&query=' + longitude + ',' + latitude + '&units=m'
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to find location!!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const data = {
                temp: body.current.temperature,
                feelslike: body.current.feelslike,
                place: body.location.name + ',' + body.location.region + ',' + body.location.country,
                weather: body.current.weather_descriptions
            }
            callback(undefined, data)
        }
    })
}

module.exports = forecast