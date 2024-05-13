import React from 'react';
import { useState, useEffect } from "react";

const Challenge1 = ()=> {
      let mystyle = {
        height: "50px",
        width: "200px",
        backgroundColor: "purple",
        padding: "10px",
        marginTop: "20px"
      }
      const [show, setShow] = useState(true);
  
      return (
        <div className="container1">
          <button style={mystyle} onClick={() => setShow((show) => !show)}> Show / Hide</button>
          {show ? <h1>Welcome to React Challenges</h1> : null}
        </div>
      );
  }
  export default Challenge1;