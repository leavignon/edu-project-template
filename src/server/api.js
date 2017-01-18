const express = require('express')
const router = express.Router()
const FindFinder =require('node-find-files');
const config = require('./config.js');

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
		}
	})

	finder.startSearch();
})


module.exports = router

