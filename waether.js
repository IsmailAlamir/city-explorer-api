'use strict'
const axios = require('axios');

async function weatherhandler(req,res){
    const lat = req.query.lat;
    const lon = req.query.lon;
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
// https://api.weatherbit.io/v2.0/forecast/daily?lat=48.8588897&lon=2.3200410217200766&key=${process.env.WEATHER_API_KEY}

    axios 
.get(URL)
.then(result=>{
    let witherArray=result.data.data.map(item=>{
        return new Forecast(item);

    })
    res.status(200).send(witherArray);


})
.catch(error => {
res.status(404).send(error);

})

}



class Forecast {
    constructor(item) {
        this.valid_date = item.valid_date;
        this.description = item.weather.description;
    }
}

module.exports= weatherhandler;
