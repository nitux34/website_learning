
var express = require('express');
var indexRouter = require('./routes/index.js');
var cors = require('cors');

var app = express();

app.use(cors())
app.use(express.json());
app.use('/', indexRouter);
//app.use(express.static('website_content'));
//app.use(express.static('artwork'));
//app.use('/content', require('./routes/content.js'));
app.listen(4000, '127.0.0.1');
console.log('listening on port 4000');

// app.listen(4000, () => {
//     console.log('listening on port 4000');
// })