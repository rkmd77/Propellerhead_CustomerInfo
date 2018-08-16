const express = require('express')
const ExpressRouter = express.Router()
const model = require('./model.js')

const Customer = model.getModel('customer')


ExpressRouter.get('/list', function(req, res){
	// Customer.remove({},function(e,d){});
	// const type = req.query.type
	return res.json({code:111})
			// const {type} = req.query		//和上面写法一样
			// Customer.find({type}, function(err, doc){
			// 	return res.json({code:0, data:doc})
			// })
})

// ExpressRouter.post('/update', function(req, res){
// 	const userid = req.cookies.userid;
// 	if(!userid){
// 		return json.dumps({code:1})
// 	}
// 	// console.log(req.body);
// 	User.findByIdAndUpdate(userid, req.body, {new:true}, function(err,doc){			//第一个参数先匹配id, 第二个update什么
// 		// console.log(doc);
// 		const data = Object.assign({},{					//因为node没有配es6环境，所以三个点...这里不能用，这里用assign来合并数据
// 			user:doc.user,
// 			type:doc.type
// 		},req.body);
// 		doc.save();
// 		return res.json({code:0, data})
// 	})

// })


















module.exports = ExpressRouter