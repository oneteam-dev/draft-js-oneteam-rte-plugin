import React, { Component } from 'react';
import unionClassNames from 'union-class-names';
import styles from './index.css';

export default class Button extends Component {
  render() {
    return (
      <button
        onMouseDown={this.props.onMouseDown}
        className={unionClassNames(styles.root, this.props.active ? styles.active : '')}
      >
        {this.props.children}
      </button>
    );
  }
}
