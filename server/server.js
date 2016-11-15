'use strict';

const express 	= 	require('express');
const http 		= 	require('http');
const redis 	= 	require('redis');
const url 		= 	require('url');
const kafka 	= 	require('kafka-node');
const path 		= 	require('path');
const assert	=	require('assert');
// Constants
const PORT 		= 	8080;
const client 	= 	redis.createClient();

// App
const app = express();
const SERVER_COUNTER = "SERVER_COUNTER";
app.enable('trust proxy');
var counter = 1;
var totalNode = 4;



var generateShortURL = (url) => {
	return convertTobase64(url); 
}
var convertTobase64 = (url) =>{
	var keystr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var encodestr = "";
	do{
		encodestr += keystr[url % 62];
		url = Math.floor(url/62);
	}while(url);
	//console.log(encodestr);
	return encodestr;
};
var redirect307 = (res,location) =>{
	res.status(307);
	res.set("Location",location);
	res.send("Redirect");
}
var req_ip = (req) => {
        return ( req.headers["X-Forwarded-For"]
              || req.headers["x-forwarded-for"]
              || req.client.remoteAddress );
}
app.get('/*', (req, res) => {
	var url_parts = url.parse(req.originalUrl, true);
	var query = url_parts.query;
	console.log(req_ip(req));
	var src = query['url'];
	if('url' in query){
		if(!src.startsWith('http')){
			src = 'http://' + src;
		}
		client.get(src,(err,val) =>{
			//console.log(val);
			if(val === null) {
				var shortURL = generateShortURL(counter);
				var fullUrl = req.protocol + '://' + req.get('host') + '/' + shortURL;
				//console.log(shortURL);
				client.get(shortURL,(err,val) =>{
				if(val === null){
					client.set(shortURL, src,()=>{
						counter ++;
						client.set(src,shortURL,()=>{});
					});
				}
				res.send(fullUrl);
				});
			}else{
				var fullUrl = req.protocol + '://' + req.get('host') + '/' + val;
				res.send(fullUrl);
			}
		});		
	}else{
		var key = req.url.substring(1);
		console.log(key);
		if(key === null || key == ""){
			console.log(__dirname);
			res.sendFile(path.join(__dirname+'/static/index.html'));
		}else{
			//console.log("hello "+ key)
			client.get(key,(err,val) =>{
				if(val != null){
					redirect307(res,val);
				}else{
					res.status(404);
					res.send("NOT FOUND");
				}
			});
		}
	}
});
var existHandler = ()=>{
	client.send_command('DECR',[SERVER_COUNTER],(err,reply) =>{
		console.log("decrease the counter");
		client.close();
	});
};
client.send_command('INCR',[SERVER_COUNTER],(err,size) =>{
	counter = size;
	client.send_command('CLIENT',['LIST'],(err,reply) =>{
		console.log(reply);
	});
	app.listen(PORT,()=>{
		console.log('Running on http://localhost:' + PORT);
	});
});

