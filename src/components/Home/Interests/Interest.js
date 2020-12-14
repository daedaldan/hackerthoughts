import React, { Component } from 'react';

import { Button } from 'antd';

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
      <div className="interest">
        <Button type="text" style={{
          display: 'inline-block',
          borderRadius: '10px',
          borderStyle: 'solid',
          borderColor: '#F0F0F0',
          borderWidth: 1,
          marginRight: 5,
          marginBottom: 20
        }} onClick={this.handleDelete}>
          { this.props.interest.interest }
          <p className="delete-interest">X</p>
        </Button>
      </div>
    );
  }
}
