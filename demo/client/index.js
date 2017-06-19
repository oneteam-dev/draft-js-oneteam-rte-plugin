import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';

// Import your routes so that you can pass them to the <Router /> component
// eslint-disable-next-line import/no-named-as-default

// Only render in the browser
if (typeof document !== 'undefined') {
  const render = (Component) => {
    ReactDOM.render(
      <AppContainer><Component /></AppContainer>,
      document.getElementById('root')
    );
  };

  render(App);

  if (module.hot) {
    module.hot.accept('./containers/App', () => { render(App); });
  }
}
