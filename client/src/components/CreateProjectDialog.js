import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../actions';
import CustomInput from './CustomInput';

class CreateProjectDialog extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(formData) {
        await this.props.newProject(formData);
        if (!this.props.errorMessage) {
        }
        else {
            this.props.handleClose()
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <fieldset>
                            <Field
                                name="name"
                                type="text"
                                id="name"
                                label="Enter project name"
                                placeholder="Project 1"
                                component={CustomInput} />
                        </fieldset>
                        <fieldset>
                            <Field
                                name="ref"
                                type="text"
                                id="ref"
                                label="Enter project refernce"
                                placeholder="pro-001"
                                component={CustomInput} />
                        </fieldset>

                        {this.props.errorMessage ?
                            <div className="alert alert-danger">
                                {this.props.errorMessage}
                            </div> : null}

                        <button type="submit" className="btn btn-primary">Create project</button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'createProject' })
)(CreateProjectDialog);