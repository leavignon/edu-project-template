const express = require('express');
const router = require('./api.js');
const config = require('./config.js');

var app = express() ; 

app.use('/notes',router);

app.listen(config.port, function(){
	console.log("Test")
})





