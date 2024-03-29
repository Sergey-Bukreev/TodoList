import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import AppWithRedux from "./AppWithRedux/AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {BrowserRouter as Router} from "react-router-dom";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
           <Provider store={store}>
               <Router>
                   <AppWithRedux />
               </Router>
           </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

