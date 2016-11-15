const express = require('express');
const http = require('http')

const app = express();
app.get('/test',(req,res) =>{
	res.send('test');
});
app.listen(8080,()=>{
	console.log("Begin");
});
