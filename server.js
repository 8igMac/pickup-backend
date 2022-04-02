const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/status', (req, res) => res.json({clients: clients.length}));

app.post('/api/schedule', (req, res) => {
    // TODO: Regester clients as driver.
    console.log('Driver post schedules.');
});

app.get('/api/request_drivers', (req, res) => {
    // Don't need to impl this yet.
    console.log('Request drivers.');
});

app.post('/api/choose_driver', (req, res) => {
    // TODO: 
    // - Pick the first driver from the clients and create a match.
    // - Broadcast the match to driver and passenger.
    console.log('Choose driver.');
}); 

app.post('/api/driver_location', (req, res) => {
    // TODO: Send estimated arrival time to clients.
    consoloe.log('Driver started.');
});

app.post('/api/driver_finished', (req, res) => {
    // TODO: 
    // - Send gift to driver.
    // - Send rating to passenger.
    console.log('Driver finished');
});

app.post('/api/rating_score', (req, res) => {
    // TODO: 
    // - Register rating score in the match.
    // - If we got both the rating score and it is above 8 points,
    //   broadcast the friend notification to driver and passenger.
    console.log('Post rating score');
});

const PORT = 3000;

let clients = [];
let matches = [];

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
