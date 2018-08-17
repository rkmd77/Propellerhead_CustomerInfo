const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/pph_customer'
mongoose.connect(DB_URL)

const models = {
	customer:{
		'custid':{type:String, require:true},
		'name':{type:String, require:true},
		'phone':{type:String},
		'address':{type:String},
		'status':{type:String},
		'notes':{type:String}
	}
}

for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel: function(name){
		return mongoose.model(name)
	}
}