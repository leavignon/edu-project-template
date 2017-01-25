const express = require('express')
const router = express.Router()
const FindFinder =require('node-find-files');
const config = require('./config.js');
const uuid = require('node-uuid') ; 
const fs = require('fs');
const json = require('json-stringify-safe');


router.get('/',function(req, res){
	var finder = new FindFinder({
		rootFolder:config.data,
		filterFunction : function (path, stat){
			return path.endsWith('.json');
		}
	})
	
	var files = [];
	finder.on("match", function(strPath, stat) {
		files.push(strPath);
	}).on("complete", function(){
		if(files.length == 0) {
			return res.sendStatus(204, 'No content');
		}else{
			var notes = []
			for(var i = 0 ; i < files.length ; i++){
				notes.push(JSON.parse(fs.readFileSync(files[i],'utf8')));
			}
			console.log(notes);
			return res.json(notes);
		}
	})

	finder.startSearch();
})

router.post('/', function(req,res){
	var note = req.body;
	note.id = uuid.v4();
	note.date = Math.floor(Date.now() / 1000);
	
	fs.writeFile(config.data+'/'+note.id+'.json' , json(note), function(err){
		if(err == null ){
			return res.status(201).send(json(note.id));	
		}else{
			return res.status(500).send();
		}
	}) ; 
	

}) 

router.get('/:id',function(req, res){

	if(fs.existsSync(config.data+'/'+req.params.id+'.json')){
		
		fs.readFile(config.data+'/'+req.params.id+'.json' , function read(err, data) {
				if (err) {
					throw err;
				}
				
				console.log(data);
				return res.json(JSON.parse((data)));        
		}); 
	}else{
		return res.sendStatus(404, 'Not found');
	} 
})


router.delete('/:id',function(req, res){

	if(fs.existsSync(config.data+'/'+req.params.id+'.json')){
		
		fs.unlinkSync(config.data+'/'+req.params.id+'.json');   
		
		return res.sendStatus(204, 'File deleted');
		 
	}else{
		return res.sendStatus(404, 'Not found');
	} 
})

module.exports = router

