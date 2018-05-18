import { connect } from 'react-redux';
import { changeName } from '../store';
import React from 'react';

const NameEntry = props => {
  return (
    <form className="form-inline">
      <label htmlFor="name">Your name:</label>
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        className="form-control"
        onChange={props.handleChange}
      />
    </form>
  );
};

const mapsDisptachToProps = dispatch => {
  return {
    handleChange: event => dispatch(changeName(event.target.value)),
  };
};

export default connect(null, mapsDisptachToProps)(NameEntry);
