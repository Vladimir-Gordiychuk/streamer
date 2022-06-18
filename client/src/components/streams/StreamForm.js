import React from 'react';
import { Field, reduxForm } from 'redux-form';

/**
 * A form to edit stream properties.
 * Form properties are:
 * onSubmit - form submit event handler.
 */
class StreamForm extends React.Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
        return null;
    }

    renderInput = ({ input, label, meta }) => {
        const errorClass = meta.error && meta.touched ? 'error' : '';
        return (
            <div className={`field ${errorClass}`} >
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {

        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }

}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title)
        errors.title = 'Title must not be empty.';
    if (!formValues.description)
        errors.description = 'Description must not be empty.'
    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);