const express = require('express')
const ExpressRouter = express.Router()
const model = require('./model.js')

const Customer = model.getModel('customer')

ExpressRouter.get('/empty', function (req, res) {
    Customer.remove({}, function (e, d) { });

})

ExpressRouter.get('/getcustomerlist', function (req, res) {
    Customer.find({}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                results: 'empty'
            });
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '',
                    results: doc
                });
            }
        }
    })
})

ExpressRouter.post('/findcustomer', function (req, res) {
    Customer.findOne({
        custid: req.body.customerid
    }, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                results: ''
            });
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '',
                    results: doc
                });
            }
        }
    })
})

ExpressRouter.post('/savecustomer', function (req, res) {
    // console.log(req.body.notes);
    const data = {
        custid: req.body.custid,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        status: req.body.status,
        creation: req.body.creation
    };

    var jsons = Object.assign({}, data, { notes: JSON.stringify(req.body.notes) });
    // console.log(jsons);

    Customer.findOne({ custid: req.body.custid }, function (err, doc) {
        // console.log(doc);
        if (doc) {
            return res.json({ status: '1', msg: 'Customer ID Existed, please try again !' })
        }
        Customer.create(jsons, function (err, doc) {
            if (err) {
                return res.json({
                    status: '1',
                    msg: 'back-end server error!!!',
                    results: ''
                })
            }
            return res.json({
                status: '0',
                msg: 'Customer Saved Successfully!',
                results: doc
            });
        })

    })
})

ExpressRouter.post('/updatecustomer', function (req, res) {
    // console.log(req.body);
    const query = {
        custid: req.body.custid,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        status: req.body.status,
        creation: req.body.creation
    };

    var jsons = Object.assign({}, query, { notes: JSON.stringify(req.body.notes) });
    // console.log(jsons);

    const customerid = req.body.cust_id;
    if (!customerid) {
        return res.json({ status: '1', msg: 'back-end server error!!!' })
    }

    Customer.findByIdAndUpdate(customerid, jsons, { new: true }, function (err, doc) {
        // console.log(doc);
        const data = Object.assign({}, doc, req.body);
        // console.log(data);
        doc.save();
        return res.json({
            status: '0',
            msg: 'Customer Update Successfully!',
            results: data
        });
    })
})

ExpressRouter.post('/searchcustomerlist', function (req, res) {
    // console.log(req.body);
    let query = req.body.searchType === 'customerId' ? { custid: req.body.keyword } : { name: req.body.keyword };
    Customer.findOne(query, function (err, doc) {
        // console.log(doc);
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                results: ''
            });
        } else {
            if (doc) {
                return res.json({
                    status: '0',
                    msg: '',
                    results: doc
                });
            }
            else {
                return res.json({
                    status: '1',
                    msg: 'Not found',
                    results: ''
                });
            }
        }
    })
})

module.exports = ExpressRouter