const request = require('request')

const forecast = (latitude,longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=ee1a13c8dddefc117e4f51e73a431b69&query=' + longitude + ',' + latitude  + '&units=f'
    request({ url, json:true }, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined,
            body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degree out. It feels like ' + body.current.feelslike + ' degree out. The humidity is ' + body.current.humidity + '%')

        }
    })
}



module.exports = forecast