import MUtil from 'util/util.jsx'

const _mm   = new MUtil();

class Customer{
    getCustomerList(){
        return _mm.request({
            url: '/cust/getcustomerlist'
        });
    }

    saveCustomer(customer){
        console.log(customer);
        return _mm.request({
            type    : 'post',
            url     : '/cust/savecustomer',
            data    : customer
        });
    }

    
}

export default Customer;