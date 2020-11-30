import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Home from './components/Home/Home.js'
import Website from './components/Website/Website.js'

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <nav>
            <Link to={"/"}>
              Website
            </Link>

            <ul>
              <li>
                <Link to={"/home"}>
                  Home
                </Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/" component={Website} />
            <Route exact path="/home" component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
