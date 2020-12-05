import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';

import { Button } from 'antd';

import AuthService from '../../services/auth.service.js';

const required = value => {
  if (!value) {
    return (
        // add CSS to make it alert instead of text
        <div>
          This field is required.
        </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
        // add CSS to make it alert instead of text
        <div>
          This is not a valid email.
        </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 | value.length > 20) {
    return (
        // add CSS to make it alert instead of text
        <div>
          The username must be between 3 and 20 characters.
        </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return(
        // add CSS to make it alert instead of text
        <div>
          The password must be between 6 and 40 characters.
        </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    // validate form inputs
    this.form.validateAll();

    // if no errors occurred, register user based on form inputs
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.email,
        this.state.username,
        this.state.password
      ).then(
          // if registration is successful, redirect user to Login component
          response => {
            this.setState({
              message: response.data.message,
              successful: true
            });

            this.props.history.push('/login');
            window.location.reload();
          },
          // if any errors occur, show appropriate error message(s)
          error => {
            if (error.response.status === 400) {
              this.setState({
                successful: false,
                message: "The username or email you used is already associated with an account. " +
                    "Please try again with a different one."
              });
            } else {
              const resMessage =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();

              this.setState({
                successful: false,
                message: resMessage
              });
            }
          }
      );
    }
  }

  render() {
    return (
      <Form
          onSubmit={this.handleRegister}
          ref={c => {
            this.form = c;
          }}
      >
        {/* check if successful registration has already occurred before showing form inputs */}
        {!this.state.successful && (
            <div>
              <label htmlFor="username">Username</label>
              <Input
                  type="text"
                  name="username"
                  className="form-input"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  validations={[required, vusername]}
              />

              <label htmlFor="email">Email</label>
              <Input
                  type="text"
                  name="email"
                  className="form-input"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  validations={[required, email]}
              />

              <label htmlFor="password">Password</label>
              <Input
                  type="password"
                  name="password"
                  className="form-input"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required, vpassword]}
              />

              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
            </div>
        )}


        {/* show message(s) if there are any */}
        {this.state.message && (
            // add CSS to make it alert instead of text
            <div>
              {this.state.message}
            </div>
        )}

        {/* CheckButton is used to check for errors with form and is not displayed on UI */}
        <CheckButton
            style={{ display: "none" }}
            ref={c => {
              this.checkBtn = c;
            }}
        />
      </Form>
    );
  }
}
