import React, { Component } from 'react';
import unionClassNames from 'union-class-names';

export default class Button extends Component {
  onMouseDown = (e) => {
    const { onMouseDown } = this.props;
    if (typeof onMouseDown === 'function') {
      e.preventDefault();
      onMouseDown();
    }
  }

  onClick = (e) => {
    const { onClick } = this.props;
    if (typeof onClick === 'function') {
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
