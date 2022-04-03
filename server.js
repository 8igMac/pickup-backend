const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const subscribe = (req, res, isDriver) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
    };
    res.writeHead(200, headers);

    const clientId = Date.now();

    const newClient = {
        id: clientId,
        isDriver,
        res
    };

    clients.push(newClient);
    // '\n' indicates end of event.
    res.write(`${JSON.stringify({id: clientId})}\n`);

    req.on('close', () => {
        console.log(`${clientId} Connection closed.`);
        clients = clients.filter(client => client.id !== clientId);
    });
    return newClient;
};


// Usage:
//
// const data = {
//     type: 'driverFinished',
//     content: 'driver finished',
// };
// boradcast(JSON.stringify(data));//debug
const boradcast = (data) => {
    clients.forEach(client =>client.res.write(`${data}\n`));
}

const sendMessage = (data, id) => {
    const target = clients.find((client) => client.id === id);
    target.res.write(`${data}\n`);
}

app.get('/status', (req, res) => {
    res.json({
        driver: clients.filter((client) => client.isDriver).length,
        passenger: clients.filter((client) => !client.isDriver).length,
    });
});

app.get('/api/subscribe', (req, res) => {
    console.log('Client subscribed');
    const client = subscribe(req, res, false);
    const data = {
        type: 'gift',
        content: 'Subscribed to server.'
    }
    sendMessage(JSON.stringify(data), client.id);
});

app.get('/api/register_driver/:id', (req, res) => {
    // Register client as driver.
    let client = clients.find((client) => client.id === parseInt(req.params.id));
    if (client) {
        console.log(`Register client ${client.id} as driver.`);
        client.isDriver = true;
        res.json({status: `Register ${client.id} as a driver.`});
    } else {
        console.log('Client not found.');//debug
    }
});

app.get('/api/request_drivers', (req, res) => {
    // Don't need to impl this yet.
    console.log('Request drivers.');
});

app.post('/api/choose_driver', (req, res) => {
    // Resgister the client as passenger.
    const passenger = subscribe(req, res, false);

    // Pick the first driver from the clients. 
    const driver = clients.find((client) => client.isDriver).id;

    // Create a match.
    const match = {
        driverId: driver.id,
        passengerId: passenger.id,
    }
    matches.push(match);
    console.log(`match created, passenger id: ${passenger.id}, driver id: ${driver.id}`);//debug

    // Broadcast the match to driver and passenger.
    const passengerData = {
        type: 'driverMatched',
        content: 'We matched a driver for you.',
    };
    sendMessage(JSON.stringify(passengerData), passenger.id);
    const driverData = {
        type: 'passengerMatched',
        content: 'A passenger needs a ride.',
    }
    sendMessage(JSON.stringify(driverData), driver.id);
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
