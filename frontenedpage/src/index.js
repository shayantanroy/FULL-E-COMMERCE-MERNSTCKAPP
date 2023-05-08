import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
// import  {store}  from './reduximplement/Store';
import store from './reduximplement/Store';
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};



const root = ReactDOM.createRoot(document.getElementById('root'));


let persist=persistStore(store)


root.render(
  <React.StrictMode>
    <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      {/* <PersistGate persistor={persist}>
      <App />
      </PersistGate> */}
    <App />
    </AlertProvider>
    </Provider>
  </React.StrictMode> 
);

