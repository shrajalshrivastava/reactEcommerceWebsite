import React from 'react';
import ReactDOM from 'react-dom'
import App from './App';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider } from 'react-redux'
import {store, persistor}from './Redux/createStore'



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
     <PersistGate persistor ={persistor}>
        <App />
     </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Provider will make the redux store available for the entire application