const request = require('request')

module.exports = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c43b0486468e55a9a61c26c8c8f43d3d&query=' + latitude + ',' + longitude + '&units=m';
    
    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback("Unable to connect to forecast service", undefined)
        } else if (body.error) {
            callback("Unable to find the location! Try another search", undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out, and it feels like " + body.current.feelslike + " degrees out")
        }
    })
}