import React, { Component } from 'react';
import NameEntry from './NameEntry';

export class Navbar extends Component {
  render() {
    return (
      <nav>
        <h3># channelname goes here</h3>
        <NameEntry />
      </nav>
    );
  }
}
