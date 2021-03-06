import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.css';

import Home from './components/Home/Home.js';
import Website from './components/Website/Website.js';
import Login from './components/Authentication/Login.js';
import Register from './components/Authentication/Register.js';
import Logout from './components/Authentication/Logout.js';

import { Button } from 'antd';

import PrivateRoute from './components/PrivateRoute/PrivateRoute.js';

import AuthService from './services/auth.service.js';


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined
    };

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logout() {
    AuthService.logout();

    this.setState({
      currentUser: undefined
    });
  }

  render() {
    let navbarLinks;

    // show different navbar links based on user authentication status
    if (this.state.currentUser) {
      // if user is logged in
      navbarLinks = (<ul>
                      <li>
                        <Logout logout={this.logout}/>
                      </li>
                      <li>
                        <Link to={"/home"}>
                          <Button type="text">Home</Button>
                        </Link>
                      </li>
                    </ul>);
    } else {
      // if no user is logged on
      navbarLinks = (<ul>
                      <li>
                        <Link to={"/register"}>
                          <Button type="primary">Register</Button>
                        </Link>
                      </li>
                      <li>
                        <Link to={"/login"}>
                          <Button type="text">Login</Button>
                        </Link>
                      </li>
                    </ul>);
    }

    // elements to be rendered
    return (
      <div>
        <BrowserRouter>
          <nav>
            <Link id="logo" to={"/"}>
              HackerThoughts
            </Link>

            {navbarLinks}
          </nav>

          <Switch>
            <Route exact path="/" component={Website} />
            <PrivateRoute exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
