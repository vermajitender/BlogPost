import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { createPost } from '../actions/index'; 

class PostsNew extends Component {
    submit(values) {
        this.props.createPost(values)
            .then(() => {
                this.props.history.push('/');
            });
    }

    renderInputField = ({ input, type, label, meta: { touched, error, invalid } }) => (
        <div className={`form-group ${touched && invalid ? 'has-danger' : ''}`}>
            <label>{label}:</label>
            <input {...input} type={type} placeholder={label} className="form-control"/>
            <div className="text-help">
                {touched ? error : ''}
            </div>
        </div>
    )
    
    renderTextArea = ({ input, type, label, meta: { touched, error, invalid } }) => (
        <div className={`form-group ${touched && invalid ? 'has-danger' : ''}`}>
            <label>{label}:</label>
            <textarea {...input} type={type} placeholder="Enter some content" className="form-control"/>
            <div className="text-help">
                {touched ? error : ''}
            </div>
        </div>
    )

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.submit.bind(this))}>
                <h3>Create a New Post</h3>
                <br />
                
                <Field name="title" component={this.renderInputField} type="text" label="Title" />
                
                <Field name="categories" component={this.renderInputField} type="text" label="Category" />
                
                <Field name="content" component={this.renderTextArea} type="text" label="Content" />
                
                <br />
                <button type="submit" className="btn btn-success">Save</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        ); 
    }
}

const validate = values => {
    const errors = {};

    if(!values.title) {
        errors.title = 'Title is required';
    }

    if(!values.categories) {
        errors.categories =  'Enter categories';
    }

    if(!values.content) {
        errors.content = 'Enter some content';
    }

    return errors;
}

export default reduxForm({ form: 'PostsNewForm', validate })(connect(null, { createPost })(PostsNew));