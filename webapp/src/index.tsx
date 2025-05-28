import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Context } from './context';
import Store from './store/store';

const store = new Store();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Context.Provider value={{ store }}>
    <App />
  </Context.Provider>
);