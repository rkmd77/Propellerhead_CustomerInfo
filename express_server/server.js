const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const customerRouter = require('./customer')

const app = express();

// app.use(bodyParser.json());
app.use(bodyParser());


app.use('/cust', customerRouter);
app.use(function(req,res,next){
	console.log(req.url);
	if(req.url.startsWith('/customer/')){			//设置白名单
		return next()
	}
	return res.sendFile(path.resolve('dist/index.html'))			//path.resolve() 是修正路径用的
})
app.listen(9090, function(){
	console.log('Node Express Server start at 9090 ...');
})