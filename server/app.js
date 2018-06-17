// Requiring the express middlewear
const express = require('express');
// creating an instance of express
const app = express();
// requiring the modules
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

//  Requiring credentials file
const cred = require('./config/credentials');

// -------- MongoDB operations----------------
mongoose.connect(cred.database);

mongoose.connection.on('connected', () => {
    console.log('connected to Database');
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

//--------------------------------------------


// use environment port if avilable othervise use 8080
const port = process.env.port || 8080;

// express static folder path
app.use(express.static(path.join(__dirname, "public")));
// using bodyparser for parsing json body from requests
app.use(bodyparser.json());

// requiring routes for resources
const user = require('./routes/user');
const device = require('./routes/device');
const data = require('./routes/data');
const control = require('./routes/control');


// using routes for resources
app.use('/user', user);
app.use('/device', device);
app.use('/data', data);
app.use('/control', control);


// Routing all requests to the static file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start listening to requests
app.listen(port, () => {
    console.log('Server running on port: ' + port);
});

