import React from 'react';
import MUtil from 'util/util.jsx'
import Customer from 'service/customer-service.jsx'
import PageTitle from 'component/page-title/index.jsx';
import Selecter from 'component/selecter/index.jsx'
import NotesLists from 'pages/customer/notes_lists/index.jsx';

import './index.scss';

const _mm = new MUtil();
const _customer = new Customer();

class CustomerEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            custid: this.props.match.params.pid,
            name: '',
            phone: '',
            address: '',
            status: '',
            creation: '',
            notes: [],
            cust_id: null
        }
    }
    componentDidMount() {
        // console.log(this.props.match.params.pid);
        this.loadCustomerInfo();
    }

    loadCustomerInfo() {
        if (this.state.custid) {
            _customer.getCustomer(this.state.custid).then((res) => {
                // console.log(res.results.notes);
                if (res.status === '0') {
                    this.setState({
                        cust_id: res.results._id,
                        custid: res.results.custid,
                        name: res.results.name,
                        phone: res.results.phone,
                        address: res.results.address,
                        status: res.results.status,
                        creation: res.results.creation,
                        notes: res.results.notes ? JSON.parse(res.results.notes) : null
                    });
                }
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
    }

    onSelectorValueChange(value) {
        this.setState({
            status: value
        })
    }

    getNotesList(noteslist) {
        this.setState({
            notes: noteslist
        })
    }

    onSave() {
        // console.log(this.state.notes);
        _customer.updateCustomer(this.state).then((res) => {
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
                <PageTitle title='Edit Customer' />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">Customer ID</label>
                        <div className="col-md-6">
                            <p className="form-control-static">{this.state.custid}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Customer Name</label>
                        <div className="col-md-6">
                            <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">phone</label>
                        <div className="col-md-6">
                            <p className="form-control-static">{this.state.phone}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Address</label>
                        <div className="col-md-6">
                            <p className="form-control-static">{this.state.address}</p>
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
                        <div className="col-md-6">
                            <p className="form-control-static">{this.state.creation}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Notes</label>
                        <div className="col-md-6">
                            <NotesLists
                                defaultNotesValue={this.state.notes}
                                getNotesList={this.getNotesList.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary"
                                onClick={(e) => { this.onSave(e) }}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CustomerEdit;