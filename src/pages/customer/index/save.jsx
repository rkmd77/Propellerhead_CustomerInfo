import React from 'react';
import MUtil from 'util/util.jsx'
import Customer from 'service/customer-service.jsx'
import PageTitle from 'component/page-title/index.jsx';
import NotesLists from 'pages/customer/notes_lists/index.jsx';

import './index.scss';

const _mm = new MUtil();
const _customer = new Customer();

class CustomerSave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            custid: '001',
            name: 'Rick',
            phone: '02108978150',
            address: '365 East Coast Road',
            status: '0',
            notes: {}
        }
    }
    componentDidMount() {
        // this.loadProduct();
    }

    getNotesList(noteslist) {
        // console.log(typeof(noteslist));
        this.setState({
            notes: noteslist
        })
    }

    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        });
    }

    onSubmit() {
        let customer = this.state;
        let customerinfo = {
            custid: customer.custid,
            name: customer.name,
            phone: customer.phone,
            address: customer.address,
            status: customer.status,
            // notes: customer.notes
        }
        const jsons = Object.assign({},customerinfo,{notes:customer.notes});

         _customer.saveCustomer(jsons).then((res) => {
            _mm.successTips(res.msg);
                // this.props.history.push('/product/index');
            }, (errMsg) => {
            });

        // let customer = this.state;
        // console.log(customer);
        // axios.post('/save/savecustomer', {
        //     custid: customer.custid,
        //     name: customer.name,
        //     phone: customer.phone,
        //     address: customer.address,
        //     status: customer.status,
        //     notes: customer.notes
        // })
        //     .then(res => {
        //         console.log(res);
        //     });

    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title='Add Customer' />
                <div className="form-horizontal">
                    <div className="form-group required">
                        <label className="col-md-2 control-label">Customer ID</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control"
                                placeholder="Customer ID"
                                name="custid"
                                value={this.state.custid}
                                onChange={(e) => this.onValueChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Customer Name</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control"
                                placeholder="Customer Name"
                                name="name"
                                value={this.state.name}
                                onChange={(e) => this.onValueChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Phone Number</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control"
                                placeholder="Phone Number"
                                name="phone"
                                value={this.state.phone}
                                onChange={(e) => this.onValueChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Address</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control"
                                placeholder="Address"
                                name="address"
                                value={this.state.address}
                                onChange={(e) => this.onValueChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">status</label>
                        <div className="col-md-3">
                            <select className="form-control" name="status"
                                onChange={(e) => this.onValueChange(e)}>
                                <option value="0">prospective</option>
                                <option value="1">current</option>
                                <option value="2">non-active</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Notes</label>
                        <div className="col-md-6">
                            <NotesLists getNotesList={this.getNotesList.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary"
                                onClick={(e) => { this.onSubmit(e) }}>SAVE</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CustomerSave;