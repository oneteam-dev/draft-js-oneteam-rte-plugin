import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './base.css';
import App from './containers/App';

// Import your routes so that you can pass them to the <Router /> component
// eslint-disable-next-line import/no-named-as-default

// Only render in the browser
if (typeof document !== 'undefined') {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}
