import React from 'react';
import { useState, useEffect } from "react";

const Challenge4 = ()=> {
    // function Progress() {
      const [input, setInput] = useState(10);
      return (
        <>
          <div style={{ fontFamily: 'Arial', width: "500px" }}>
            <h1 className="text-center">Progress Bar</h1>
  
            <div>
              <div className="container">
                {input >= 0 && input <= 100 ? (
                  <div className="innerContainer" style={{ width: `${input}%` }}>
                    {input}%
                  </div>
                ) : (
                  alert("please enter value less than 100")
                )}
              </div>
            </div>
            <div>Input : <input type="number" value={input} onChange={(e) => setInput(e.target.value)} /></div>
          </div>
        </>
      )
    // }
  }
  export default Challenge4;