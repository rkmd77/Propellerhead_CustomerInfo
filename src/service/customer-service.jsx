import MUtil from 'util/util.jsx'

const _mm = new MUtil();

class Customer {
    getCustomerList(listParam) {
        // console.log(listParam);
        let url = '',
            type = 'get',
            data = {};
        if (listParam.listType === 'list') {
            url = '/cust/getcustomerlist';
        } else if (listParam.listType === 'search') {
            url = '/cust/searchcustomerlist';
            type = 'post';
            data = listParam;
        }
        return _mm.request({
            type: type,
            url: url,
            data: data
        });
    }

    saveCustomer(customer) {
        // console.log(customer);
        return _mm.request({
            type: 'post',
            url: '/cust/savecustomer',
            data: customer
        });
    }

    updateCustomer(customer) {
        // console.log(customer);
        return _mm.request({
            type: 'post',
            url: '/cust/updatecustomer',
            data: customer
        });
    }

    getCustomer(customerid) {
        return _mm.request({
            type: 'post',
            url: '/cust/findcustomer',
            data: {
                customerid: customerid || 0
            }
        });
    }
}

export default Customer;