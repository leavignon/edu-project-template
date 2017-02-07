const express = require('express');
const router = require('./api.js');
const config = require('./config.js');
const bodyParser = require('body-parser');

var app = express() ; 

app.use(bodyParser.json()) ; 
app.use('/notes',router);

app.use(express.static(config.static));
app.use(function(req,res,next){
	res.sendFile('index.html', {
		root:config.static
	});
});

app.listen(config.port, function(){
	console.log("Démarrage serveur")
})








