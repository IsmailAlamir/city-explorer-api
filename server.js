require('dotenv').config();
const express = require('express'); //import express framework
const cors = require('cors');
const server = express();
const weather = require('./data/weather.json');

server.use(cors()); // make the server opened for any request

const PORT = process.env.PORT;


class Forecast {
    constructor(datetime, description) {
        this.date = datetime;
        this.description = description;
    }
}
let x;


// http://localhost:3000/
server.get('/', (req, res) => {
    res.send("Hi from the home route");
})


// http://localhost:3000/test
server.get('/test', (req, res) => {
    console.log("test route");
    res.send('Hi from the test route');
})

// http://localhost:3000/weather?let=let&lon=lon
server.get('/weather', (req, res) => {
    const result = weather.find((item) => {
        if (item.lat == req.query.lat && item.lon == req.query.lon) {
            x = new Forecast(item.data[0].datetime, item.data[0].weather.description);
            return item;
        }
    })
    if (result == undefined) {
        console.log("error");
        res.send("erorr");
    } else {
        console.log(x);
        res.send(x);
    }

})

server.get('*', (req, res) => {
    res.send("page not found");
})

server.listen(PORT, () => {
    console.log(`Hello, I am listening on ${PORT}`);
})
