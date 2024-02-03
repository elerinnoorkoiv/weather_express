const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const key = 'c75551560c6b06e444f57c7a4884dbfd';
let city = 'Tartu'

app.get('/', function (req, res) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${
        city}&appid=${key}`)
        .then((responce) => {
            return responce.json()
        })
        .then((data) => {
            let description = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp)-274.31) 
            res.render('index', {
                description: description,
                city: city,
                temp: temp
            })
        })
})

app.post('/', function(req, res){
    let city = req.body.cityname
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${
        city}&appid=${key}`)
        .then((responce) => {
            return responce.json()
        })
        .then((data) => {
            let description = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp)-274.31) 
            res.render('index', {
                description: description,
                city: city,
                temp: temp
            })
        })
})

app.listen(3000)