import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from './reducers'
import middleware from './middleware'
import MToastr from 'react-redux-toasts'

const store = createStore(reducer, middleware)

ReactDOM.render(
  <Provider store={store}>
    <App />
    <MToastr/>
  </Provider>,
  document.getElementById('root')
);

