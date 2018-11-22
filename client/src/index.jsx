import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';
import App from './app/components/App';
import configureStore from './app/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app/styles/index.scss';

library.add(faSpinner, faSearch);

const store = configureStore();

render(
  <Provider store={store}><App /></Provider>,
  window.document.getElementById('app-container'),
);
