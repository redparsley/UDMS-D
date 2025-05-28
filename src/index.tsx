import React from 'react';
import ReactDOM from 'react-dom/client';
import { createContext } from 'react';
import App from './App.tsx';
import Store from './store/store.ts';

const store = new Store();

export const Context = createContext({
  store
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Context.Provider value={{ store }}>
    <App />
  </Context.Provider>
);