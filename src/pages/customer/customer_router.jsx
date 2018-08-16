import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'

import customerList      from 'pages/customer/index/index.jsx';
import customerSave      from 'pages/customer/index/save.jsx';
import customerEdit      from 'pages/customer/index/edit.jsx';


class customerRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path="/customer/index" component={customerList}/>
                <Route path="/customer/save" component={customerSave}/>
                <Route path="/customer/edit/:pid?" component={customerEdit}/>
                <Redirect exact from="/customer" to="/customer/index"/>
            </Switch>
        )
    }
}
export default customerRouter;