import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Header extends Component {
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }
    signOut() {
        console.log('Sign out got called!');
        this.props.signOut();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ marginBottom: '30px' }}>
                <Link className="navbar-brand" to="/">
                        <img src="../abc-menu-logo.svg"  alt=""></img>
                </Link>
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>

                    <ul className="nav navbar-nav ms-auto">
                        {!this.props.isAuth ?
                            [<li className="nav-item" key="signup">
                                <Link className="nav-link" to="/signup">Sign up</Link>
                            </li>,
                            <li className="nav-item" key="signin">
                                <Link className="nav-link" to="/signin">Sign in</Link>
                            </li>] : null}

                        {this.props.isAuth ?
                            <li className="nav-item">
                                <Link className="nav-link" to="/signout" onClick={this.signOut}>Sign out</Link>
                            </li> : null}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps, actions)(Header);
