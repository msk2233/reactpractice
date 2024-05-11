import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './form.css';

function MyFormex() {

    //*******************************Multiple inputs in react forms***********************************************
  // const [inputs, setInputs] = useState({});
  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   //////////didnt understand //////////////////
  //   setInputs(values => ({...values, [name]: value}))
  // }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   let divinner = inputs.username+","+inputs.age;
  //   let div = document.getElementById('div');
  //   div.innerHTML = divinner;
  // }

  // return (
  //   <form className='form' onSubmit={handleSubmit}>
  //     <label>Enter your name:
  //     <input 
  //       type="text" 
  //       name="username" 
  //       value={inputs.username || ""} 
  //       onChange={handleChange}
  //     />
  //     </label>
  //     <label>Enter your age:
  //       <input 
  //         type="number" 
  //         name="age" 
  //         value={inputs.age || ""} 
  //         onChange={handleChange}
  //       />
  //       </label>
  //       <div id="div" style={{padding:"10px"}}></div>
  //       <input type="submit" />
  //   </form>
  // )
  //***************************************************************************************************************



  //***********************onsubmit giving alert****************************************************************
  // const [name, setName] = useState("");
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

  // const [name, setName] = useState("");
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

//***********************************************TextArea in react************************************************
// const [textarea, setTextarea] = useState(
//   "The content of a textarea goes in the value attribute"
// );

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     alert(`The name you entered was: ${textarea}`)
//   }

// const handleChange = (event) => {
//   setTextarea(event.target.value)
// }

// return (
//   <form onSubmit={handleSubmit}>
//     <textarea value={textarea} onChange={handleChange} />
//     <input type="submit" value='submit' />
//   </form>
// )
//***************************************************************************************************************

//***********************************************TextArea in react************************************************
  const [myCar, setMyCar] = useState("Volvo");

  const handleChange = (event) => {
    setMyCar(event.target.value)
    alert(event.target.value);
  }

  return (
    <form>
      <select value={myCar} onChange={handleChange}>
        <option value="Ford">Ford</option>
        <option value="Volvo">Volvo</option>
        <option value="Fiat">Fiat</option>
      </select>
    </form>
  )
  //***************************************************************************************************************
}

const root8 = ReactDOM.createRoot(document.getElementById('root8'));
root8.render(<MyFormex />);

export default MyFormex;
