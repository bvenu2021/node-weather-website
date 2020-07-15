const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utls/geocode')
const forecast = require('./utls/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Venu"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Venu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        description: 'This is some help text',
        name: 'Venu'
    })
})

app.get('/weather', (req, res) => {
    let address = req.query.address

    if(!address) {
        return res.send({
            error: "You must provide an address!"
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                location,
                forecast: forecastData,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('errorHandler', {
        title: '404',
        errorMessage: 'Help article is not found',
        name: 'Venu'
    })
})

app.get('*', (req, res) => {
    res.render('errorHandler', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Venu'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})