const express = require('express')
const router = express.Router()
const FindFinder =require('node-find-files');
const config = require('./config.js');
const uuid = require('node-uuid') ; 
const fs = require('fs');
const json = require('json-stringify-safe');


router.get('/',function(req, res){
	var finder = new FindFinder({
		rootFolder:config.data
	})
	
	var files = [];
	finder.on("match", function(strPath, stat) {
		files.push(strPath);
	}).on("complete", function(){
		if(files.length == 0) {
			return res.sendStatus(204, 'hello');
			//return res.send('hello');
		}
	})

	finder.startSearch();
})

router.post('/', function(req,res){
	var note = req.body;
	note.id = uuid.v4();

	fs.writeFile('../../../data' , note, function(err){}) ; 
	res.status(201).send(json(note));

}) 

router.get('/:id',function(req, res){

	fs.readFile('../../../data', function read(err, data) {
    		if (err) {
       			throw err;
    		}
    		content = data;
    		console.log(content);  
    		processFile();          
	});  
})


module.exports = router

