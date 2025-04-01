import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

console.log("main.jsx is loaded");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("No element with id 'root' found in index.html");
} else {
  console.log("Found root element:", rootElement);
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
