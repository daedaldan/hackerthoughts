import React, { Component } from 'react';

export default class Interest extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.deleteInterest(this.props.interest.id);
  }

  render() {
    return (
      <div>
        <p>{this.props.interest.interest} <button onClick={this.handleDelete}>X</button></p>
      </div>
    );
  }
}
