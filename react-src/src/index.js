import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Import init function from "@neutralinojs/lib"
import { init } from "@neutralinojs/lib"

init(); // Add this function call

// Check for app url scheme data
if (window.NL_OS === "Darwin") {
  window.DATA = decodeURIComponent(window.NL_ARGS.find(arg => arg.startsWith("--data="))?.split("=")[1].slice(1,-1)).replace("autolaunch://","") || undefined;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);