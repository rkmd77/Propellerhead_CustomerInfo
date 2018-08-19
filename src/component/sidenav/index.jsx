import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class SideNav extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="navbar-default navbar-side">
                <div className="sidebar-collapse">
                    <ul className="nav">
                        <li className="active">
                            <Link to="/customer">
                                <i className="fa fa-users"></i>
                                <span>CUSTOMER</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/customer" activeClassName="active-menu">Customer Info</NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>

                </div>

            </div>
        )
    }
}

export default SideNav;