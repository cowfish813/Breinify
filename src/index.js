import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'regenerator-runtime/runtime.js';
import { configureAppStore } from './store/store';

let initialState = {
    productCards: {},
    modal: false
}

let store = configureAppStore(initialState);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App store={store} />);