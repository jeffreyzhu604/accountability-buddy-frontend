import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './component/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

// Creating Redux store to maintain global state for the application
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

/*  
    NOTE: Run command: npm start
    NOTE: Client is also hosted at: https://loving-mclean-2c559f.netlify.app/
*/
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>    
  </Provider>,
  document.getElementById('root')
);
