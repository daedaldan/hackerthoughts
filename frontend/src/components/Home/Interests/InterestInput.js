import React, { Component } from 'react';

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

    this.setState({ input: "" });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.addInterest(this.state.input);

      this.setState({ input: "" });
    }
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  render() {
    return (
      <div>
        <textarea value={this.state.input} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
        <button onClick={this.handleCreate}>Add</button>
      </div>
    );
  }
}
