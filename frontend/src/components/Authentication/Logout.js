import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import { Button } from 'antd';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();

    // redirect user to Website component
    this.props.history.push('/');
    window.location.reload();
  }

  render() {
    return (
        <Button onClick={this.handleLogout}>Logout</Button>
    );
  }
}

export default withRouter(Logout);
