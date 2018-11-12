import React from 'react';
import { render } from 'react-dom';
import AppComponent from './app/components/AppComponent';

render(
  <AppComponent />,
  window.document.getElementById('app-container'),
);
