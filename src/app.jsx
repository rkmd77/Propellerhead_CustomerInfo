import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Layout from 'component/layout/index.jsx';
import Error from 'pages/error/index.jsx';

import customerRouter from 'pages/customer/customer_router.jsx'
import './css/index.css'

class App extends React.Component{
    render(){
        let LayoutRouter = (
            <Layout> 
                <Switch>
                    <Route path="/customer" component={customerRouter}/>
                    <Redirect exact from="/" to="/customer"/>
                    <Route component={Error}/>
                </Switch>
            </Layout>
        );
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" render={ props => LayoutRouter}/>
                </Switch>
            </BrowserRouter>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
)