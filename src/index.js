import { StrictMode } from "react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState,useEffect } from "react";
import './index.css';


function challenge1() {
  function Hello() {
    let mystyle = {
      height:"50px",
      width:"100px",
      backgroundColor:"purple",
      padding:"10px",
      marginTop:"20px"
    }
    const [show, setShow] = useState(true);
  
    return (
      <div className="container">
        <button style={mystyle} onClick={() => setShow((show) => !show)}> Show / Hide</button>
        {show ? <h1>Welcome to React Challenges</h1> : null}
      </div>
    );
  }
  const container = document.getElementById('root');
  const root = ReactDOM.createRoot(container);
  root.render(<Hello />);
}
function challenge2() {
  function Timer() {
    const [timer,setTimer] = useState(0);
    const [intervalId , setintervalId] = useState(null);
    let start = {
      padding:"25px",
      backgroundColor:"green",
      textAlign:"center"
    }
    let stop = {
      padding:"25px",
      backgroundColor:"red",
      textAlign:"center"
    }
    let reset = {
      padding:"25px",
      backgroundColor:"yellow",
      textAlign:"center"
    }

   const starttimer = () => {
    if (!intervalId) {
      const id  = setInterval(() => {
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
    return(
      <>
      <div style={{textAlign: "center",marginTop: "400px",fontSize:"30px"}}>{timer} seconds</div>
      <div style={{textAlign:"center"}}>
        <button style={start} onClick={starttimer}> Start </button>
        <button style={stop} onClick={stoptimer}> Stop </button>
        <button style={reset} onClick={resettimer}> Reset </button>
      </div>
      </>
    )
    //******************************alternative**************************************************************
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
  }
  const container = document.getElementById('root');
  const root = ReactDOM.createRoot(container);
  root.render(<Timer />);
}
function challenge3() {
  function ToDo() {
    const [input ,setInput] = useState();
    return (
      <>
          <input placeholder="Add City" className="todoinp" type="text" value={input} onChange={(e) => setInput(e.target.value)} /><button className="btn">ADD</button>
          <div>{input}</div>
      </>
    )
  }


  const container = document.getElementById('root');
  const root = ReactDOM.createRoot(container);
  root.render(<ToDo />);
}
challenge3();
