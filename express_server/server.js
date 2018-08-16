const express = require('express')
const bodyParser = require('body-parser')

const customerRouter = require('./customer')
const path = require('path')

const app = express();

const model = require('./model.js')



app.use(bodyParser.json());		//让express解析 post 传递的json参数


app.use('/customer', customerRouter);		//开启一个中间件（user.js）在这里定义一个/user路由，然后所有后面跟的都是子路由

//========================= 做为一个服务器来启动 build 后的代码 ===================================================//
// 设置/build为静态资源地址
// 中间件
app.use(function(req,res,next){
	if(req.url.startsWith('/customer/')||req.url.startsWith('/static/')){			//设置白名单
		return next()
	}
	console.log(path.resolve('build/index.html'));
	return res.sendFile(path.resolve('build/index.html'))			//path.resolve() 是修正路径用的
})
// 首先拦截所有地址'/',然后通过中间件做转发（白名单）
app.use('/',express.static(path.resolve('build')))


//=================================================================================================//



app.listen(9093, function(){
	console.log('Node Express Server start at 9093 ...');
})