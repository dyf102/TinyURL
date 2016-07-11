'use strict';

const express = require('express');
const http = require('http');
const redis = require('redis');
const url = require('url');
// Constants
const PORT = 8080;
const client = redis.createClient();

// App
const app = express();
app.on('mount',()=>{
	
});
var counter = 1;
app.get('/*', (req, res) => {
	var url_parts = url.parse(req.originalUrl, true);
	var query = url_parts.query;
	console.log(query);
	var src = query['url'];
	if('url' in query){
		if(!src.startsWith('http')){
			//src = 'http://' + src;
		}
		var fullUrl = req.protocol + '://' + req.get('host') + '/' + counter;
		console.log(fullUrl);
		client.get(''+counter,(err,val) =>{
			if(val === null){
				client.set(''+counter, src,()=>{
					counter ++;
				});
			}
			res.send(fullUrl);
		});
	}else{
		var key = req.url.substring(1);
		console.log("hello "+ key)
		client.get(key,(err,val) =>{
			console.log(val);
			res.status(307);
			res.set("Location",val);
			res.send("Redirect");
		});
	}
});

app.listen(PORT,()=>{
	console.log('Running on http://localhost:' + PORT);
});
