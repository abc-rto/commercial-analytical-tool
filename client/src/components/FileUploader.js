import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';

import css from '../css/styles.css'

class FileUploader extends Component {

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:5001/upload/post", data, {
            // receive two    parameter endpoint url ,form data
        })
            .then(res => { // then print response status
                console.log("invincible: " + res.statusText)

            })
    }

    nextHandler = () => {
        this.props.setExpanded('panel3')
    }

    render() {
        return (
            <div className="component">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <form method="post" action="#" id="#">
                                <div class="form-group files">
                                    <input type="file" class="form-control" name={"file"} onChange={this.onChangeHandler}></input>
                                </div>
                                <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
                            </form>
                            <br></br>
                            <button type="button" class="btn btn-success btn-block" onClick={this.nextHandler}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(FileUploader);