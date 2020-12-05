import React, { Component } from 'react';

import Interests from './Interests/Interests.js';
import Comments from './Comments/Comments.js';

import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: [],
      comments: [],
      username: undefined
    };

    this.updateInterests = this.updateInterests.bind(this);
    this.updateComments = this.updateComments.bind(this);
  }

  async componentDidMount() {
    // retrieve current user's username and update state
    let currentUsername = AuthService.getCurrentUser().username;

    this.setState({
      username: currentUsername
    });

    // get list of interests from backend then update state with new interests
    await UserService.getInterests(currentUsername).then(response => {
          this.setState({ interests: response.data })
          }
    );

    // get list of comments from backend then update state with new comments
    await UserService.getComments(currentUsername).then(response => {
          this.setState({ comments: response.data });
          }
    );
  }

  // get list of interests from backend, update state with new interests, then update comments based on new interests
  async updateInterests() {
    await UserService.getInterests(this.state.username).then(response => {
          this.setState({ interests: response.data });
        }
    );

    this.updateComments();
  }

  // get list of comments from backend then update state with new comments
  async updateComments() {
    await UserService.getComments(this.state.username).then(response => {
          this.setState({ comments: response.data });
        }
    );
  }

  render() {
    return (
        <div>
          <Interests interests={this.state.interests} username={this.state.username} updateInterests={this.updateInterests}/>
          <Comments comments={this.state.comments}/>
        </div>
    );
  }
}
