import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ children }) => (
  <span className="link">{children}</span>
);

Link.propTypes = {
  children: PropTypes.node.isRequired
};

export default Link;
