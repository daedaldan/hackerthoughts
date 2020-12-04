import React from 'react';

import InterestInput from './InterestInput.js';
import Interest from './Interest.js';

export default function Interests(props) {
  function fetchInterests() {
    props.updateInterests();
  }

  function addInterest() {

  }

  function deleteInterest() {

  }

  // create list of user's current interests
  let interestsList;

  if (props.interests.length > 0) {
    interestsList = props.interests.map((interestItem) =>
      <Interest interest={interestItem.interest} deleteInterest={this.deleteInterest.bind(this)}/>
    );
  } else {
    interestsList = "No interests yet.";
  }

  return (
      <div>
        <InterestInput addInterest={this.addInterest.bind(this)}/>
        {interestsList}
      </div>
    );
}
