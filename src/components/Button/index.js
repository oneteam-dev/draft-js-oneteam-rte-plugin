import React, { Component } from 'react';
import unionClassNames from 'union-class-names';
import isFunction from 'lodash/isFunction';

export default class Button extends Component {
  onMouseDown = (e) => {
    const { onMouseDown } = this.props;
    if (isFunction(onMouseDown)) {
      e.preventDefault();
      onMouseDown();
    }
  }

  onClick = (e) => {
    const { onClick } = this.props;
    if (isFunction(onClick)) {
      e.preventDefault();
      onClick();
    }
  }

  render() {
    const { theme, children } = this.props;
    const activeClassName = unionClassNames('active', theme.active);
    const containerClassName = unionClassNames('toolbar-button', theme.button, activeClassName);
    const innerClassName = unionClassNames('toolbar-button__inner', theme.inner);
    const bodyClassName = unionClassNames('toolbar-button__body', theme.inner);
    return (
      <span
        className={containerClassName}
        onMouseDown={this.onMouseDown}
        onClick={this.onClick}
      >
        <span className={innerClassName}>
          <span className={bodyClassName}>
            {children || 'Button'}
          </span>
        </span>
      </span>
    );
  }
}
