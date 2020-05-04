import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './pages/App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import reduxThunk from 'redux-thunk';

const store = createStore(
  reducers /** Reducers */,
  {} /** Estado inicial */,
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
