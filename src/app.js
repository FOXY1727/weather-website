'use strict';
//in src folder we'll store our all JSs
//Here we'll load our express, configure it to serve something up & start a server

// const express = require('express')

// const app = express()

// app.get('', (req, res) => {
//     res.send('Hello express!!')
// })

// app.listen(3000, () => {
//     console.log('Server is up on post 3000.')
// })

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express');
const hbs = require('hbs')

const app = express()

//Define Paths for Express configuration
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials') //will get handlebars to the right directory


//set handlebars engine and views location
app.set('view engine', 'hbs')
    //Here 'view engine' is a property of .set() 
    // of type string to tell/set ExpressJS what kind of 
    // engine/format to render the page in.Here we're using 'hbs'.
app.set('views', viewsPath)
    /*A directory or an array of directories for the 
    application's views. If an array, the views are 
    looked up in the order they occur in the array.*/
hbs.registerPartials(partialspath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anjali Sharma'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Anjali Sharma'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Anjali Sharma',
        helptxt: 'You have to help yourself 🤣😁😉'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide an address!'
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, place } = {}) => {
        if (error) return res.send({ error })
        forecast(longitude, latitude, (error, { temp, feelslike, weather } = {}) => {
            if (error) return res.send({ error })
            res.send({
                longitude: longitude,
                latitude,
                address: req.query.address,
                place,
                temp,
                feelslike,
                weather //
            })
        })
    })

})

//url to send back json
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: 'Error 404',
        name: 'Anjali Sharma',
        error: 'Help article not written'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: 'Error 404',
        name: 'Anjali Sharma',
        error: 'Page not found!!🚩'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})