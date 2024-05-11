import React from 'react';
import { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/nopages";
import './index.css';
import MyForm from './App';
import FavoriteColor from './Hook';
import MyFormex from './form';

// without jsx create html elements
const myElement2 = React.createElement('h1', {}, 'I do not use JSX!');

const myElement = (
  <>
    <p>* I am a paragraph.</p>
    <p>* I am a paragraph too.</p>
  </>
);
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(myElement);

//simple jsx practice
const myFirstElement = <h1>jsx element : Hello React! 1848 × 939 <input type="text" />;</h1>
const rootforcopy = ReactDOM.createRoot(document.getElementById('rootforcopy'));
rootforcopy.render(myFirstElement);

//map practice of array
const myArray = ['Array map practice', 'apple', 'banana', 'orange'];
const myList = myArray.map((item) => <li>{item}</li>)
const root2 = ReactDOM.createRoot(document.getElementById('root2'));
root2.render(myList);

const MyElement2 = () =>{ return (React.createElement('h1', { className: 'greeting' }, 'without jsx : Hello'))};
const x= 5;
function MyElement3() { 
  return(<h3>Ternory Oprator {(x) < 10 ? "Hello" : "Goodbye"}</h3>)
}
const root3 = ReactDOM.createRoot(document.getElementById('root3'));
root3.render(<>
  <MyElement3 />
  <MyElement2 />
</>
);

//use of class and props
class Greeting extends React.Component {
  render() {
    return <h1>Greeting : (use of class and props) Hi my name is  {this.props.name}!</h1>;
  }
}
const root4 = ReactDOM.createRoot(document.getElementById('root4'));
root4.render(<><Greeting name="Alex" /></>);

// use of onclick in jsx btn
function Football() {
  const shoot = () => {
    alert("Great Shot!");
  }
  return (
    <button className='btn' style={{backgroundColor:"teal"}} onClick={shoot}>SHOOT!</button>
  );
}
const root5 = ReactDOM.createRoot(document.getElementById('root5'));
root5.render(<Football />);


export default function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root9 = ReactDOM.createRoot(document.getElementById('root9'));
root9.render(<Application />);

function Timer() {
  const [count, setCount] = useState(3);

  useEffect(() => {
   let  myTimeout = setTimeout(() => {
      setCount((count) => count - 1);
    }, 1000);
    if (count === 0) {
      clearTimeout(myTimeout);
    }
  });

  return <h1>I have rendered {count} times!</h1>;

  // useEffect(() => {
  //   //Runs only on the first render
  // }, []);
}
const root10 = ReactDOM.createRoot(document.getElementById('root10'));
root10.render(<Timer />);

function Counter() {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);
/////////////////
  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]);
/////////////////
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>Calculation: {calculation}</p>
    </>
  );
}

const root11 = ReactDOM.createRoot(document.getElementById('root11'));
root11.render(<Counter />);