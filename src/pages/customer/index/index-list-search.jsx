import React from 'react';

class ListSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType: 'customerId', //customerId / customerName
            searchKeyword: ''
        }
    }

    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        });
    }

    onSortChange(e) {
        this.props.onSortprops(e.target.value);
    }

    onSearch() {
        this.props.onSearchprops(this.state.searchType, this.state.searchKeyword);
    }
    // for Enter keyboard
    onSearchKeywordKeyUp(e) {
        if (e.keyCode === 13) {
            this.onSearch();
        }
    }
    render() {
        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control"
                                name="searchType"
                                onChange={(e) => this.onValueChange(e)}>
                                <option value="customerId">Customer ID</option>
                                <option value="customerName">Customer Name</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                placeholder="Customer ID"
                                name="searchKeyword"
                                onKeyUp={(e) => this.onSearchKeywordKeyUp(e)}
                                onChange={(e) => this.onValueChange(e)} />
                        </div>
                        <button className="btn btn-primary"
                            onClick={(e) => this.onSearch()}><i className="fa fa-search"></i> Search</button>
                        <div className="form-group onright">
                            <label className="col-md-4 control-label">Sort By: </label>
                            <div className="col-md-8">
                                <select className="form-control"
                                    name="sort"
                                    onChange={(e) => this.onSortChange(e)}>
                                    <option value="custid">Customer ID</option>
                                    <option value="name">Customer Name</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ListSearch;