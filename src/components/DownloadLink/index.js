import React from 'react';
import PropTypes from 'prop-types';

const DownloadLink = ({ children }) => (
  <span className="download-link">{children}</span>
);

DownloadLink.propTypes = {
  children: PropTypes.node.isRequired
};

export default DownloadLink;
