// app.js
const express = require('express');
var indexRouter = require('./routes/index.js');
var cors = require('cors');
const http = require('http');
const app2 = express();

app2.use(cors())
app2.use(express.json());
app2.use('/', indexRouter);

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {
    // Set a response type of plain text for the response
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // Send back a response and end the connection
    res.end('Hello World!\n');
});

// Start the server on port 3000
app.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');