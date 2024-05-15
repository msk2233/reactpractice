import React from 'react';
import { useState } from "react";

const Challenge2 = () => {
      const [timer, setTimer] = useState(0);
      const [intervalId, setintervalId] = useState(null);
      let start = {
        padding: "25px",
        backgroundColor: "green",
        textAlign: "center"
      }
      let stop = {
        padding: "25px",
        backgroundColor: "red",
        textAlign: "center"
      }
      let reset = {
        padding: "25px",
        backgroundColor: "yellow",
        textAlign: "center"
      }
  
      const starttimer = () => {
        if (!intervalId) {
          const id = setInterval(() => {
            setTimer((count) => (count + 1));
          }, 1000);
          setintervalId(id);
        }
      };
      const stoptimer = () => {
        if (intervalId) {
          clearInterval(intervalId);
          setintervalId(null);
        }
      }
      const resettimer = () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
        setTimer(0);
        setintervalId(null);
      }
      return (
        <>
          <div style={{ textAlign: "center", marginTop: "400px", fontSize: "30px" }}>{timer} seconds</div>
          <div style={{ textAlign: "center" }}>
            <button style={start} onClick={starttimer}> Start </button>
            <button style={stop} onClick={stoptimer}> Stop </button>
            <button style={reset} onClick={resettimer}> Reset </button>
          </div>
        </>
      )
      //******************************alternative**************************************************************
      // function Timer() {
      // const [timer, setTimer] = useState(0);
  
      // const startTimer = () => {
      //   window.mTimer = setInterval(() => {
      //     setTimer((timer) => timer + 1);
      //   }, 1000);
      // };
      // const stopTimer = () => {
      //   clearInterval(window.mTimer);
      // };
      // const resetTimer = () => {
      //   clearInterval(window.mTimer);
      //   setTimer(0);
      // };
      // return (
      //   <div className="container">
      //     <h1>Timer</h1>
      //     <span>{Math.trunc(timer / 60)} mins </span>
      //     <span>{timer % 60} secs</span>
      //     <div>
      //       <button onClick={startTimer}>Start</button>
      //       <button onClick={stopTimer}>Stop</button>
      //       <button onClick={resetTimer}>Reset</button>
      //     </div>
      //   </div>
      // );
    // }
    // Timer();
  }
  export default Challenge2;