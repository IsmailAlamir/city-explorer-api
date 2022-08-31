'use strict'
require('dotenv').config();
const express = require('express'); //import express framework
const cors = require('cors');
const server = express();

let weather=require('./waether');
let movies=require('./movies');
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
server.get('/weather',weather);

// http://localhost:3000/movies
server.get('/movies',movies);


server.get('*', (req, res) => {
    res.send("page not found");
})

server.listen(PORT, () => {
    console.log(`Hello, I am listening on ${PORT}`);
})
