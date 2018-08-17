import React from 'react';
import MUtil from 'util/util.jsx'
import Customer from 'service/customer-service.jsx'
import PageTitle from 'component/page-title/index.jsx';

import './index.scss';

const _mm = new MUtil();
const _customer = new Customer();

class CustomerEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            custid: this.props.match.params.pid,
            name: 'abc',
            phone: 0,
            address: '',
            status: 0,
            notes: []
        }
    }
    componentDidMount() {
        console.log(this.props.match.params.pid);
        
        // this.loadProduct();
    }
    // 加载商品详情
    loadProduct() {
        // 有id的时候，表示是编辑功能，需要表单回填
        if (this.state.id) {
            _customer.getProduct(this.state.id).then((res) => {
                let images = res.subImages.split(',');
                res.subImages = images.map((imgUri) => {
                    return {
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    }
                });
                res.defaultDetail = res.detail;
                this.setState(res);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
    }

    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        });
    }

    onSubmit() {
        let product = {
            name: this.state.name,
            subtitle: this.state.subtitle,
            categoryId: parseInt(this.state.categoryId),
            subImages: this.getSubImagesString(),
            detail: this.state.detail,
            price: parseFloat(this.state.price),
            stock: parseInt(this.state.stock),
            status: this.state.status
        },
            productCheckResult = _customer.checkProduct(product);
        if (this.state.id) {
            product.id = this.state.id;
        }
        // 表单验证成功
        if (productCheckResult.status) {
            _customer.saveProduct(product).then((res) => {
                _mm.successTips(res);
                this.props.history.push('/product/index');
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
        // 表单验证失败
        else {
            _mm.errorTips(productCheckResult.msg);
        }

    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title='Edit Customer' />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">Customer ID</label>
                        <div className="col-md-5">
                        <p className="form-control-static">{this.state.custid}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Customer Name</label>
                        <div className="col-md-5">
                        <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">phone</label>
                        <div className="col-md-5">
                        <p className="form-control-static">{this.state.phone}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">Address</label>
                        <div className="col-md-3">
                        <p className="form-control-static">{this.state.address}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">status</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                    placeholder=""
                                    name="stock"
                                    value={this.state.stock}
                                    onChange={(e) => this.onValueChange(e)} />
                                <span className="input-group-addon">Unit</span>
                            </div>

                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary"
                                onClick={(e) => { this.onSubmit(e) }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CustomerEdit;