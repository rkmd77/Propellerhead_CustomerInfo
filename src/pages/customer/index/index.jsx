import React from 'react';
import MUtil from 'util/util.jsx'
import { Link }     from 'react-router-dom';
import Customer from 'service/customer-service.jsx'

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';


import './index.scss';

const _mm = new MUtil();
const _customer = new Customer();

class CustomerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    id: 1234560,
                    name: 'live 1',
                    phone: 123456789,
                    address: '365 East Coast Road, Auckland',
                    status: 'prospective',
                    notes: ['abc','nds']
                }
            ]
        };
    }

    componentDidMount() {

        // this.loadCustomerList();
    }
    loadCustomerList() {
        _customer.getCustomerList().then(res => {
            console.log(res);
            this.setState({
                list: res.list,
                customer: res.customer,
                suburb: res.suburb,
                material: res.material,
                colour: res.colour
            });
            this.changeSelectorValue(res.customer, res.suburb, res.material, res.colour);
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    onValueChange(e) {
        var name = e.target.name,
            value = e.target.value,
            id = e.target.getAttribute('data-index');

        var data = this.state.list.map(v => {
            if (v.id === parseInt(id)) {
                v[name] = value;
            }
            return v
        });
        this.setState({ list: data })
    }
    
    render() {
        let tableHeads = [
            { name: 'Customer ID', width: '10%' },
            { name: 'Name', width: '10%' },
            { name: 'Phone', width: '10%' },
            { name: 'Address', width: '10%' },
            { name: 'Status', width: '10%' },
            { name: 'Notes', width: '50%' }
        ];
        return (
            <div id="page-wrapper">
                <PageTitle title="Customer List">

                </PageTitle>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((customer, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                    <Link to={ `/customer/edit/${customer.id}` }>{customer.id}</Link></td>
                                    <td>{customer.name}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.address}</td>
                                    <td>
                                        <span className={customer.status == 1 ? 'onsale' : 'offstock'}>{customer.status == 1 ? 'On Sale' : 'Off Stock'}</span>
                                        <button className={customer.status == 1 ? 'btn btn-xs btn-right btn-danger' : 'btn btn-xs btn-right btn-success'}
                                            onClick={(e) => {this.onSetcustomerStatus(e, customer.id, customer.status)}}>{customer.status == 1 ? 'Off Stock' : 'On Sale'}</button>
                                    </td>
                                    <td>{customer.notes}</td>
                                </tr>
                            );
                        })
                    }
                </TableList>
            </div>
        );
    }
}

export default CustomerList;