'use strict'
require('dotenv').config();
const express = require('express'); //import express framework
const cors = require('cors');
const server = express();
const axios = require('axios');


server.use(cors()); // make the server opened for any request

const PORT = process.env.PORT || 3001;



// http://localhost:3000/
server.get('/', (req, res) => {
    res.send("Hi from the home route");
})


// http://localhost:3000/test
server.get('/test', (req, res) => {
    console.log("test route");
    res.send('Hi from the test route');
})


// http://localhost:3000/weather
server.get('/weather',weatherhandler);


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






// http://localhost:3000/movies
server.get('/movies',movieshandler);


async function movieshandler(req,res){
    const searchQuery = req.query.searchQuery;
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`
    axios 
.get(URL)
.then(result=>{
    let moviesArray=result.data.results.map(item=>{
        console.log(item);

        return new Movie(item);

    })
    res.status(200).send(moviesArray);


})
.catch(error => {
res.status(404).send(error);

})

}



class Movie {
    constructor(item) {
       this.title= item.title;
       this.average_votes=item.vote_average;
       this.totalVotes=item.vote_count;
       this.image_url=`https://image.tmdb.org/t/p/w500/${item.poster_path}`;
       this.popularity= item.popularity;
       this.released_on= item.release_date;       
            }
}





server.get('*', (req, res) => {
    res.send("page not found");
})

server.listen(PORT, () => {
    console.log(`Hello, I am listening on ${PORT}`);
})
