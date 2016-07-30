import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import DropZoneFile from '../data/dropzone_file';

class Signup extends Component {

  handleFormSubmit(formProps) {
    const image = this.props.imageSubmission;
    this.props.resetForm();
    this.props.clearSubmitComponent();
    this.props.signupUser(formProps, { image });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ooops! </strong>{this.props.errorMessage}
        </div>
      );
    }
  }
  
  render() {
    const {
      handleSubmit,
      fields: { email, password, passwordConfirm, firstname, lastname, bio }
    } = this.props;

    return (
      <div className="push-from-top">
        <h2 className="center-text">Sign up to be suPerCooL</h2>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>First Name:</label>
            <input className="form-control" {...firstname} />
            {
              firstname.touched &&
              firstname.error &&
              <div className="error">{email.error}</div>
            }
          </fieldset>
          <fieldset className="form-group">
            <label>Last Name:</label>
            <input className="form-control" {...lastname} />
            {
              lastname.touched &&
              lastname.error &&
              <div className="error">{lastname.error}</div>
            }
          </fieldset>
          <fieldset className="form-group">
            <label>Bio:</label>
            <textarea className="form-control" {...bio} />
            {
              bio.touched &&
              bio.error &&
              <div className="error">{bio.error}</div>
            }
          </fieldset>
          <fieldset className="form-group">
            <label>Email:</label>
            <input className="form-control" {...email} />
            {
              email.touched &&
              email.error &&
              <div className="error">{email.error}</div>
            }
          </fieldset>
          <fieldset className="form-group">
            <label>Password:</label>
            <input type="password" className="form-control" {...password} />
            {
              password.touched &&
              password.error &&
              <div className="error">{password.error}</div>
            }
          </fieldset>
          <fieldset className="form-group">
            <label>Confirm Password:</label>
            <input type="password" className="form-control" {...passwordConfirm} />
            {
              passwordConfirm.touched &&
              passwordConfirm.error &&
              <div className="error">Please enter a password confirmation</div>
            }
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Sign Up</button>
        </form>
        <br />
        <DropZoneFile />
      </div>
    );
  }
}

// validate is a helper function from reduxForm
function validate(formProps) {
  const errors = {};

  ['email', 'password', 'passwordConfirm', 'firstname', 'lastname', 'bio'].forEach(elem => {
      if (!formProps[elem]) errors[elem] = `Please enter your ${elem}`
    });

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(formProps.email)) {
    errors.email = 'Not a valid email address';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

// Grabs state.auth and passes to this.props - in this case error -> errorMessage
function mapStateToProps(state) {
  return { errorMessage: state.auth.error, imageSubmission: state.auth.imageSubmission };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm', 'firstname', 'lastname', 'bio'],
  validate
}, mapStateToProps, actions)(Signup);