import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './form.css';

function MyFormex() {
  const [name, setName] = useState("");

  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs.username+","+inputs.age);
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <label>Enter your name:
      <input 
        type="text" 
        name="username" 
        value={inputs.username || ""} 
        onChange={handleChange}
      />
      </label>
      <label>Enter your age:
        <input 
          type="number" 
          name="age" 
          value={inputs.age || ""} 
          onChange={handleChange}
        />
        </label>
        <input type="submit" />
    </form>
  )



  //***********************onsubmit giving alert****************************************************************
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     alert(`The name you entered was: ${name}`)
//   }

//   return (
//     <form class="form" onSubmit={handleSubmit}>
//       <label>Enter your name:
//         <input 
//           type="text" 
//           value={name}
//           onChange={(val) => setName(val.target.value)}
//         />
//       </label>
//       <input type="submit" value='submit' />
//     </form>
//   )
//***************************************************************************************************************

//***********************simple onchange name and print it to div************************************************
  //simple onchange name and print it to div

//   return (
//     <form class="form">
//       <label>Enter your name:
//         <input
//           type="text" onChange={(e) => setName(e.target.value)}/>
//           <div>{name}</div>
//       </label>
//     </form>
//   )
//***************************************************************************************************************
}

const root8 = ReactDOM.createRoot(document.getElementById('root8'));
root8.render(<MyFormex />);

export default MyFormex;
