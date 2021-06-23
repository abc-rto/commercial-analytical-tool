import React, { Component } from 'react';
import { connect } from 'react-redux';

// eslint-disable-next-line import/no-anonymous-default-export
export default (OriginalComponent) => {
    class MixedComponent extends Component {

        checkAuth() {
            //Whether user is authenticated
            if (!this.props.isAuth && !this.props.jwtToken) {
                this.props.history.push('/');
            }
        }

        componentDidMount() {
            //Whether user is authenticated
            this.checkAuth();
        }

        componentDidUpdate() {
            //Whether user is authenticated
            this.checkAuth();
        }

        render() {
            return <OriginalComponent {...this.props}/>;
        }
    }

    function mapStateToProps(state) {
        return {
            isAuth: state.auth.isAuthenticated,
            jwtToken: state.auth.token
        }
    }

    return connect(mapStateToProps)(MixedComponent);
};

