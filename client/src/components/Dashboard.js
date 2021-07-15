import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as actions from '../actions';

import Accordions from './Accordions'

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    }
  }

  async componentDidMount() {
    this.props.getSecret();
  }

  render() {
    return (
      <div className="component">
        <Accordions/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    secret: state.dash.secret
  }
}

export default connect(mapStateToProps, actions)(Dashboard);