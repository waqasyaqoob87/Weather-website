const request = require('request')
const geocode = (address, callback)=>{
    //    const url= 'https://api.geoapify.com/v1/geocode/search?text='+ address + 'format=json&apiKey=b28fa36fe45a441a88a76d7ca370eedf'
       const url = 'https://api.geoapify.com/v1/geocode/search?text=' + address + '.&bias=proximity:7.0652029,52.4309185&format=json&apiKey=b28fa36fe45a441a88a76d7ca370eedf'
        request({ url, json:true },(error, {body})=>{
            if(error){
               return callback('Unable to connect to location services! ',undefined)
            }else if(body.results.length===0){
                // console.log(response.body.results + 'this')
               return callback('Unable to find location. Try another search.',undefined)
            }else{
                callback(undefined, {
                    latitude: body.results[0].lat,
                    longitude: body.results[0].lon
                })
            }
        })
    }
    

    module.exports = geocode