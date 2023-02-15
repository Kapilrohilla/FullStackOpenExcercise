import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// render is in diffenent line as in same line is  show an error 'that root element is never used'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
