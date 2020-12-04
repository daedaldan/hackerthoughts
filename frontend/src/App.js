import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Home from './components/Home/Home.js';
import Website from './components/Website/Website.js';
import Login from './components/Authentication/Login.js';
import Register from './components/Authentication/Register.js';
import Logout from './components/Authentication/Logout.js';

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

    if (this.state.currentUser) {
      // show on navbar if user is logged in
      navbarLinks = (<ul>
                      <li>
                        <Link to={"/home"}>
                          Home
                        </Link>
                      </li>
                      <li>
                        <Logout logout={this.logout}/>
                      </li>
                    </ul>);
    } else {
      // show on navbar if no user is logged on
      navbarLinks = (<ul>
                      <li>
                        <Link to={"/login"}>
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link to={"/register"}>
                          Register
                        </Link>
                      </li>
                    </ul>);
    }
    return (
      <div>
        <BrowserRouter>
          <nav>
            <Link to={"/"}>
              Website
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
