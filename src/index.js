//import 'react-app-polyfill/ie11';
//import 'react-app-polyfill/stable';

// IE11 needs "jsxRuntime classic" for this initial file which means that "React" needs to be in scope
// https://github.com/facebook/create-react-app/issues/9906
import React from 'react';
import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import AppRoutes from './AppRoutes';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
    <AppRoutes />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
