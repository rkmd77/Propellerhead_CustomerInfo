import React from 'react';
import MUtil from 'util/util.jsx'
import { Link } from 'react-router-dom';
import Customer from 'service/customer-service.jsx'

import PageTitle from 'component/page-title/index.jsx';
import ListSearch from './index-list-search.jsx';
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
            listType: 'list'
        };
    }

    componentDidMount() {
        this.loadCustomerList();
    }

    onSort(value) {
        let newlist = this.state.list.sort(this.onCompare(value));
        this.setState({
            list: newlist
        });
    }

    loadCustomerList() {
        let listParam = {};
        listParam.listType = this.state.listType;
        // if search, pass type and keyword
        if (this.state.listType === 'search') {
            listParam.searchType = this.state.searchType;
            listParam.keyword = this.state.searchKeyword;
        }
        _customer.getCustomerList(listParam).then(res => {
            // console.log(res.results);
            if (res.status === '0') {
                let resresults = '';
                resresults = listParam.listType === 'list' ? [...res.results] : [res.results];
                this.setState({
                    list: resresults
                }, () => {
                    return this.onSort('custid')
                });
            }
            else {
                this.setState({
                    list: []
                });
            }
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }

    randomColor() {
        var string = "success,info,warning,danger";
        var array = string.split(",");
        var value = array[Math.round(Math.random() * (array.length - 1))];
        return "bg-" + value + " autowidth";
    }

    onSearch(searchType, searchKeyword) {
        // console.log(searchType, searchKeyword);
        let listType = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            listType: listType,
            searchType: searchType,
            searchKeyword: searchKeyword
        }, () => {
            // console.log(this.state.listType);
            this.loadCustomerList();
        });
    }

    onCompare(prop) {
        return function (obj1, obj2) {
            var val1 = obj1[prop];
            var val2 = obj2[prop];
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                val1 = Number(val1);
                val2 = Number(val2);
            }
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        }
    }

    render() {
        let tableHeads = [
            { name: 'Customer ID', width: '10%' },
            { name: 'Name', width: '10%' },
            { name: 'Phone', width: '10%' },
            { name: 'Address', width: '10%' },
            { name: 'Status', width: '12%' },
            { name: 'Create At', width: '15%' },
            { name: 'Notes', width: '33%' }
        ];
        return (
            <div id="page-wrapper">
                <PageTitle title="Customer List">
                    <div className="page-header-right">
                        <Link to="/customer/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span> Add New Customer</span>
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch onSearchprops={(searchTypeprops, searchKeywordprops) => { this.onSearch(searchTypeprops, searchKeywordprops) }}
                    onSortprops={(sortvalue) => { this.onSort(sortvalue) }} />
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((customer, index) => {
                            if (!!customer.notes) {
                                var jsonArray = JSON.parse(customer.notes);
                                var noteArray = [];
                                for (var i = 0; i < jsonArray.length; i++) {
                                    noteArray.push(jsonArray[i].text);
                                    // console.log(noteArray);
                                }
                            }
                            return (
                                <tr key={index}>
                                    <td>
                                        <Link to={`/customer/edit/${customer.custid}`}>{customer.custid}</Link></td>
                                    <td className="overflow">{customer.name}</td>
                                    <td className="overflow">{customer.phone}</td>
                                    <td className="overflow">{customer.address}</td>
                                    <td>
                                        <fieldset disabled>
                                            <Selecter readOnly defaultSelectedList={customer.status} />
                                        </fieldset>
                                    </td>
                                    <td className="overflow">{customer.creation}</td>
                                    <td>{noteArray ? noteArray.map((v, i) => {
                                        return <span key={i} className={this.randomColor()}>{v}</span>
                                    }) : null}
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