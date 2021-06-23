import React, { Component } from 'react';
import { connect } from 'react-redux'
import css from '../css/styles.css'
import * as actions from '../actions';

class Dashboard extends Component {
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

        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <form method="post" action="#" id="#">
                <div class="form-group files">
                  <label>Upload Your File </label>
                  <input type="file" class="form-control" multiple=""></input>
                </div>
              </form>
            </div>
          </div>
        </div>
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