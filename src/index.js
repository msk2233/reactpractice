import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyForm from './App';
import FavoriteColor from './Hook';
import MyFormex from './form';

//map practice of array
const myArray = ['Array map practice', 'apple', 'banana', 'orange'];
const myList = myArray.map((item) => <li>{item}</li>)

//simple jsx practice
const myFirstElement = <h1>jsx element : Hello React! 1848 × 939 <input type="text" />;</h1>

// without jsx create html elements
// const myElement2 = React.createElement('h1', {}, 'I do not use JSX!');
const myElement2 = () =>{ return (React.createElement('h1', { className: 'greeting' }, 'without jsx : Hello'))};

const myElement3 = (
  <>
    <p>* I am a paragraph.</p>
    <p>* I am a paragraph too.</p>
  </>
);

const x = 5;



const root2 = ReactDOM.createRoot(document.getElementById('root2'));
const root = ReactDOM.createRoot(document.getElementById('root'));
const rootforcopy = ReactDOM.createRoot(document.getElementById('rootforcopy'));
const root3 = ReactDOM.createRoot(document.getElementById('root3'));
root2.render(myList);
rootforcopy.render(myFirstElement);
root.render(myElement3);
// root3.render(<myElement4 />);

class Greeting extends React.Component {
  render() {
    return <h1>Shruti, {this.props.name}!</h1>;
  }
}

const root4 = ReactDOM.createRoot(document.getElementById('root4'));
root4.render(<Greeting name="riya" />);

function Football() {
  const shoot = () => {
    alert("Great Shot!");
  }
  return (
    <button onClick={shoot}>SHOOT!</button>
  );
}
const root5 = ReactDOM.createRoot(document.getElementById('root5'));
root5.render(<>
  <Football />
</>
);

function MyElement3() { 
  return(<h1>Ternory Oprator {(x) < 10 ? "Hello" : "Goodbye"}</h1>)
}
root3.render(<>
  <MyElement3 />
</>
);