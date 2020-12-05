import React, { Component } from 'react';

import { Input, Button } from 'antd';

export default class InterestInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ""
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleCreate() {
    this.props.addInterest(this.state.input);

    // reset text area
    this.setState({ input: "" });
  }

  handleKeyPress(e) {
    // add interest if 'Enter' key is pressed, then reset text area
    if (e.key === 'Enter') {
      this.props.addInterest(this.state.input);

      this.setState({ input: "" });
    }
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  render() {
    const { TextArea } = Input;

    return (
      <div className="interest-input">
        <TextArea value={this.state.input} rows={1} style={{ width: 400, marginRight: 20 }} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
        <Button type="primary" style={{ marginTop: 10 }} onClick={this.handleCreate}>Add</Button>
      </div>
    );
  }
}
