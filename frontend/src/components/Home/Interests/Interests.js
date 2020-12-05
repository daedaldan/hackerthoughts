import React, { Component } from 'react';

import InterestInput from './InterestInput.js';
import Interest from './Interest.js';

import UserService from '../../../services/user.service.js';

export default class Interests extends Component {
  constructor(props) {
    super(props);

    this.fetchInterests = this.fetchInterests.bind(this);
    this.addInterest = this.addInterest.bind(this);
    this.deleteInterest = this.deleteInterest.bind(this);
  }

  fetchInterests() {
    this.props.updateInterests();
  }

  async addInterest(interest) {
    await UserService.createInterest(interest, this.props.username).then(response => {
      this.fetchInterests();
    });
  }

  async deleteInterest(interest_id) {
    await UserService.deleteInterest(interest_id).then(response => {
      this.fetchInterests();
    });
  }

  render() {
    // create list of user's current interests
    let interestsList;

    if (this.props.interests.length > 0) {
      interestsList = this.props.interests.map((interestItem) =>
        <Interest interest={interestItem} key={interestItem.id} deleteInterest={this.deleteInterest}/>
      );
    } else {
      interestsList = "No interests yet.";
    }

    return (
      <div>
        <p>Hi there, {this.props.username}.</p>
        <p>Type in a few of your interests.</p>
        <InterestInput addInterest={this.addInterest}/>
        {interestsList}
      </div>
    );
  }
}
