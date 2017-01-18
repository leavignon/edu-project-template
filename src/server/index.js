const express = require('express');
const router = require('./api.js');
const config = require('./config.js');
const bodyParser = require('body-parser');

var app = express() ; 

app.use(bodyParser.json()) ; 
app.use('/notes',router);


app.listen(config.port, function(){
	console.log("Test")
})





