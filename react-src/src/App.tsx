import { useEffect } from 'react'
import React from "react"
import { checkIntegrity } from './installer/macos';
// import { os } from '@neutralinojs/lib';
import './App.css';

// Import filesystem namespace
import { filesystem } from "@neutralinojs/lib"

function App() {

  // Log current directory or error after component is mounted
  useEffect(() => {
    filesystem.readDirectory('./').then((data) => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <div className="App">
      AutoLaunch Dev
      <br/>
      <button onClick={checkIntegrity}>Check integrity</button>
      {/* <button onClick={()=>{
        os.execCommand("say hi")
      }}>Check pop</button> */}
      <br/>
      Launch Args: {window.NL_ARGS}
      <br/>
      Current Data: {window.DATA ? window.DATA : "None"}
    </div>
  );
}

export default App;