import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyD3lWCDTjDF7O_MZ5jaf1m39mGMPm15SJY",
  authDomain: "exchangeapp-8b4d5.firebaseapp.com",
  databaseURL: "https://exchangeapp-8b4d5.firebaseio.com",
  projectId: "exchangeapp-8b4d5",
  storageBucket: "exchangeapp-8b4d5.appspot.com",
  messagingSenderId: "174787367151",
  appId: "1:174787367151:web:85289deeeb67b324d38b1a"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
serviceWorker.unregister();