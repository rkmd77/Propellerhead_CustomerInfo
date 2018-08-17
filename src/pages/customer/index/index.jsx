import React from 'react';
import MUtil from 'util/util.jsx'
import { Link }     from 'react-router-dom';
import Customer from 'service/customer-service.jsx'

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
import Selecter from 'component/selecter/index.jsx'

import './index.scss';

const _mm = new MUtil();
const _customer = new Customer();

class CustomerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            notelist: []
        };
    }

    componentDidMount() {

        this.loadCustomerList();
    }
    loadCustomerList() {
        _customer.getCustomerList().then(res => {
            console.log(res.results);
            this.setState({
                list: res.results
                
            });
            // this.changeSelectorValue(res.customer, res.suburb, res.material, res.colour);
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
    
    randomColor(){
      var string = "success,info,warning,danger";
      var array = string.split(",");
      var value = array[Math.round(Math.random()*(array.length-1))];
      return "bg-"+value+" autowidth";
    }

    render() {
        let tableHeads = [
            { name: 'Customer ID', width: '10%' },
            { name: 'Name', width: '10%' },
            { name: 'Phone', width: '10%' },
            { name: 'Address', width: '10%' },
            { name: 'Status', width: '15%' },
            { name: 'Notes', width: '45%' }
        ];
        return (
            <div id="page-wrapper">
                <PageTitle title="Customer List">

                </PageTitle>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((customer, index) => {
                          if(!!customer.notes){
                            var jsonArray = JSON.parse(customer.notes);
                            var noteArray = [];
                            for(var i = 0; i < jsonArray.length; i++){
                              noteArray.push(jsonArray[i].text);
                              console.log(noteArray);
                              }
                            }
                            return (
                                <tr key={index}>
                                    <td>
                                    <Link to={ `/customer/edit/${customer.custid}` }>{customer.custid}</Link></td>
                                    <td>{customer.name}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.address}</td>
                                    <td>
                                        <Selecter readOnly defaultSelected={customer.status} />
                                    </td>
                                    <td>{noteArray?noteArray.map((v,i)=>{
                                        return <span key={i} className={this.randomColor()}>{v}</span>
                                      }):null}
                                    </td>

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