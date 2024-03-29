const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
//setup handlebars engine and views location
app.set('view engine', 'hbs' )
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index', {
        title:'Nodejs Weather App',
        name: 'Waqas Yaqoob'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title:'About Page',
        name: 'Waqas Yaqoob'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        helptext: 'THis is helpful text!',
        title:'Help Page',
        name: 'Waqas Yaqoob'

    })
})


// app.get('/about', (req, res)=>{
//     res.send('<h1>Weather App</h1>')
// })

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, ( error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'It is hot',
    //     location:'Multan',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title: '4040',
        name:'waqas',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        name: 'Waqas',
        errorMessage:'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port' + port)
}) 
