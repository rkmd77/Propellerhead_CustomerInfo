import React from 'react';
import MUtil from 'util/util.jsx'
import Customer from 'service/customer-service.jsx'
import PageTitle from 'component/page-title/index.jsx';
import Selecter from 'component/selecter/index.jsx'
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
            creation: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
            notes: {}
        }
    }

    getNotesList(noteslist) {
        this.setState({
            notes: noteslist
        })
    }

    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    onSelectorValueChange(value) {
        this.setState({
            status: value
        })
    }

    onSubmit() {
        let customer = this.state;

        _customer.saveCustomer(customer).then((res) => {
            _mm.successTips(res.msg);
            if (res.status === '0') {
                this.props.history.push('/customer/index');
            }
        }, (errMsg) => {
            _mm.errorTips(errMsg);
        });
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
                            <Selecter defaultSelected={this.state.status} name="status"
                                onSelectorValueChange={(value) => this.onSelectorValueChange(value)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Create At</label>
                        <div className="col-md-3">
                            <span>{this.state.creation}</span>
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