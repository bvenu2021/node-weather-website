const request = require('request');

module.exports = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYnZlbnUyMDIxIiwiYSI6ImNrY2tibTl5NjF0dmUyeG0ydzhrdGNmOHgifQ.KFxiEpW1DkCtXb4eN2RXJA';

    request({ url, json: true}, (error, { body } = {}) => {
        if(error) {
            callback("Unable to connect to the geocoding server", undefined)
        } else if (body.features.length === 0) {
            callback("unable to find location!", undefined)
        } else {
            callback(undefined, 
                { latitude: body.features[0].center[1],
                  longitude: body.features[0].center[0],
                  location: body.features[0].place_name
                })
        }
    })
}