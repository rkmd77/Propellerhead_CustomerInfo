const express = require('express')
const ExpressRouter = express.Router()
const model = require('./model.js')

const Customer = model.getModel('customer')

ExpressRouter.get('/empty', function(req, res){
	Customer.remove({},function(e,d){});

})

ExpressRouter.get('/getcustomerlist', function(req, res){
	Customer.find({}, function(err, doc){
		if(err){
			res.json({
				status: '1',
				msg: err.message,
				results: 'empty'
			});
		}
		else{
			if(doc){
				res.json({
					status: '0',
					msg:'',
					results: doc
				});
			}
		}
	})
})

ExpressRouter.get('/findcustomerlist', function(req, res){
	Customer.find({}, function(err, doc){
		if(err){
			res.json({
				status: '1',
				msg: err.message,
				results: ''
			});
		}
		else{
			if(doc){
				res.json({
					status: '0',
					msg:'',
					results: doc
				});
			}
		}
	})
})

ExpressRouter.post('/savecustomer', function(req, res){
	console.log(req.body.notes);
	const data = {
		custid: req.body.custid, 
		name: req.body.name, 
		phone: req.body.phone, 
		address: req.body.address, 
		status: req.body.status};

		var jsons = Object.assign({},data,{notes:JSON.stringify(req.body.notes)});
		console.log(jsons);

	Customer.findOne({custid:req.body.custid}, function(err, doc){
		// console.log(doc);
		if(doc){
			return res.json({code:1, msg: 'Customer ID Existed, please try again !'})
		}
		Customer.create(jsons, function(err, doc){
			if(err){
				return res.json({
					status:1, 
					msg:'back-end server error!!!',
					results:''
				})
			}
			return res.json({
					status: '0',
					msg:'Customer Saved Successfully!',
					results: doc
				});
		})

	})
})


















module.exports = ExpressRouter