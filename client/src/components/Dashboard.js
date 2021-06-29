import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as actions from '../actions';

import FileUploader from './FileUploader';
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
        <div>
          {/* <br></br>
          Our secret: <h3>{this.props.secret}</h3> */}
        </div>
        <FileUploader />
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