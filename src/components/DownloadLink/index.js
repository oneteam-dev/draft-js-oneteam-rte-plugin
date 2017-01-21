import React, { PropTypes } from 'react';

const DownloadLink = ({ children }) => (
  <span className="download-link">{children}</span>
);

DownloadLink.propTypes = {
  children: PropTypes.node.isRequired
};

export default DownloadLink;
