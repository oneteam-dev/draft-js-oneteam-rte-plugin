import React, { PropTypes } from 'react';

const Link = ({ children }) => (
  <span className="link">{children}</span>
);

Link.propTypes = {
  children: PropTypes.node.isRequired
};

export default Link;
