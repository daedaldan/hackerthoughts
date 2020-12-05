import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

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

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    // if no errors occurred, log user in based on form inputs
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
          // if login is successful, redirect user to Home page
          () => {
            this.props.history.push('/home');
            window.location.reload();
          },
          // if any errors occur, show appropriate error message(s)
          error => {
            if (error.response.status === 400) {
              this.setState({
                successful: false,
                loading: false,
                message: "Your username or password is incorrect. Please try again."
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
                loading: false,
                message: resMessage
              });
            }
          }
      );
    } // if form validation is unsuccessful
    else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <Form
          onSubmit={this.handleLogin}
          ref={c => {
            this.form = c;
          }}
      >
        <label htmlFor="username">Username</label>
        <Input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.onChangeUsername}
            validations={[required]}
        />

        <label htmlFor="password">Password</label>
        <Input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChangePassword}
            validations={[required]}
        />

        <button disabled={this.state.loading}>
          Login
        </button>

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
