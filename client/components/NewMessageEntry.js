import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeMessage, getNewMessage, postMessage } from '../store';

class NewMessageEntry extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.write(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    const content = this.props.newMessageEntry;
    const channelId = this.props.channelId;
    const name = this.props.name;
    this.props.post({ content, channelId, name });
  }

  render() {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            // onChange={(event) => {this.handleChange(event)}
            onChange={this.handleChange}
            value={this.props.newMessageEntry}
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              Chat!
            </button>
          </span>
        </div>
      </form>
    );
  }
}
const mapStateToProps = state => {
  return {
    newMessageEntry: state.newMessageEntry,
    name: state.name,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    write: msg => dispatch(writeMessage(msg)),
    post: msg => dispatch(postMessage(msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry);
